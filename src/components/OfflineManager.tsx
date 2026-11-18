'use client'

import { flushOfflineEvents, queueOfflineEvent } from '@/lib/offline-sync'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function OfflineManager() {
  const pathname = usePathname()
  const router = useRouter()
  const [online, setOnline] = useState(true)
  const [message, setMessage] = useState('')
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null)

  useEffect(() => {
    setOnline(navigator.onLine)
    if ('serviceWorker' in navigator) {
      void navigator.serviceWorker.register('/sw.js')
    }

    const handleOffline = () => {
      setOnline(false)
      setMessage('You are offline. Your activity will be saved on this device.')
      if (window.location.pathname !== '/system/offline') {
        window.sessionStorage.setItem('chiyambi-return-route', window.location.pathname)
        router.replace('/system/offline')
      }
    }
    const handleOnline = async () => {
      setOnline(true)
      setMessage('Connection restored. Syncing saved activity…')
      const result = await flushOfflineEvents()
      setMessage(
        result.pending
          ? `${result.pending} saved item${result.pending === 1 ? '' : 's'} waiting to sync.`
          : 'You are back online. Saved activity is synced.',
      )
      window.setTimeout(() => setMessage(''), 4500)
    }
    const handleInstall = (event: Event) => {
      event.preventDefault()
      setInstallPrompt(event as InstallPromptEvent)
    }
    const handleSyncStatus = (event: Event) => {
      const detail = (event as CustomEvent<{ pending: number; synced: number; state: string }>)
        .detail
      if (detail.state === 'offline') {
        setMessage('Saved offline. This will sync when your connection returns.')
      } else if (detail.state === 'synced' && detail.synced) {
        setMessage(`${detail.synced} saved item${detail.synced === 1 ? '' : 's'} synced.`)
        window.setTimeout(() => setMessage(''), 3500)
      }
    }
    const handleFormSubmission = (event: SubmitEvent) => {
      const form = event.target
      if (!(form instanceof HTMLFormElement)) return
      const fields = Array.from(form.elements)
        .filter(
          (field): field is HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement =>
            field instanceof HTMLInputElement ||
            field instanceof HTMLSelectElement ||
            field instanceof HTMLTextAreaElement,
        )
        .filter((field) => !(field instanceof HTMLInputElement && field.type === 'password'))
        .map((field, index) => field.name || field.id || `field-${index + 1}`)
      void queueOfflineEvent('form-submission', window.location.pathname, {
        formId: form.id || form.getAttribute('aria-label') || 'page-form',
        fields,
      })
    }

    window.addEventListener('offline', handleOffline)
    window.addEventListener('online', handleOnline)
    window.addEventListener('beforeinstallprompt', handleInstall)
    window.addEventListener('chiyambi:sync-status', handleSyncStatus)
    document.addEventListener('submit', handleFormSubmission)
    const timer = window.setInterval(() => {
      if (navigator.onLine) void flushOfflineEvents()
    }, 30_000)

    if (!navigator.onLine) handleOffline()
    else void flushOfflineEvents()

    return () => {
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('beforeinstallprompt', handleInstall)
      window.removeEventListener('chiyambi:sync-status', handleSyncStatus)
      document.removeEventListener('submit', handleFormSubmission)
      window.clearInterval(timer)
    }
  }, [router])

  useEffect(() => {
    if (!pathname || pathname.startsWith('/system/')) return
    void queueOfflineEvent('navigation', pathname, { title: document.title })
  }, [pathname])

  const install = async () => {
    if (!installPrompt) return
    await installPrompt.prompt()
    const choice = await installPrompt.userChoice
    if (choice.outcome === 'accepted') setInstallPrompt(null)
  }

  if (online && !message && !installPrompt) return null

  return (
    <aside className={`connectivity-notice ${online ? 'is-online' : 'is-offline'}`} role="status">
      <span aria-hidden="true">{online ? '✓' : '!'}</span>
      <p>{message || 'You are offline. Saved activity will sync automatically.'}</p>
      {!online && (
        <button type="button" onClick={() => router.push('/')}>
          Go to home
        </button>
      )}
      {installPrompt && online && (
        <button type="button" onClick={install}>
          Install Chiyambi
        </button>
      )}
    </aside>
  )
}
