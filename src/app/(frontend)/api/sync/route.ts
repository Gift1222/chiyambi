import config from '@payload-config'
import { getPayload } from 'payload'

const allowedEventTypes = new Set([
  'navigation',
  'form-submission',
  'learning-progress',
  'preference',
  'interaction',
])
const allowedSources = new Set(['web', 'pwa', 'android', 'desktop'])

type SubmittedEvent = {
  clientEventId?: unknown
  deviceId?: unknown
  eventType?: unknown
  route?: unknown
  payload?: unknown
  occurredAt?: unknown
  source?: unknown
}

function shortString(value: unknown, maxLength = 240) {
  return typeof value === 'string' ? value.slice(0, maxLength) : undefined
}

function sanitizePayload(eventType: string, value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const input = value as Record<string, unknown>

  if (eventType === 'navigation') {
    return {
      ...(shortString(input.title) ? { title: shortString(input.title) } : {}),
      ...(shortString(input.destination) ? { destination: shortString(input.destination) } : {}),
    }
  }
  if (eventType === 'form-submission') {
    const fields = Array.isArray(input.fields)
      ? input.fields
          .filter((field): field is string => typeof field === 'string')
          .slice(0, 30)
          .map((field) => field.slice(0, 80))
      : []
    return {
      formId: shortString(input.formId, 120) ?? 'form',
      fields,
    }
  }
  if (eventType === 'learning-progress') {
    return {
      ...(shortString(input.lesson, 120) ? { lesson: shortString(input.lesson, 120) } : {}),
      ...(shortString(input.course, 120) ? { course: shortString(input.course, 120) } : {}),
      ...(typeof input.completed === 'boolean' ? { completed: input.completed } : {}),
      ...(typeof input.progress === 'number' && input.progress >= 0 && input.progress <= 100
        ? { progress: input.progress }
        : {}),
      ...(typeof input.score === 'number' && input.score >= 0 && input.score <= 100
        ? { score: input.score }
        : {}),
    }
  }
  if (eventType === 'preference') {
    const setting = shortString(input.setting, 80)
    const preferenceValue =
      typeof input.value === 'string' ||
      typeof input.value === 'number' ||
      typeof input.value === 'boolean'
        ? input.value
        : undefined
    return setting && preferenceValue !== undefined ? { setting, value: preferenceValue } : null
  }
  if (eventType === 'interaction') {
    const action = shortString(input.action, 80)
    return action
      ? {
          action,
          ...(shortString(input.target, 120) ? { target: shortString(input.target, 120) } : {}),
        }
      : null
  }
  return null
}

function validateEvent(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const event = value as SubmittedEvent
  if (
    typeof event.clientEventId !== 'string' ||
    event.clientEventId.length > 80 ||
    typeof event.deviceId !== 'string' ||
    event.deviceId.length > 80 ||
    typeof event.eventType !== 'string' ||
    !allowedEventTypes.has(event.eventType) ||
    typeof event.route !== 'string' ||
    !event.route.startsWith('/') ||
    event.route.length > 240 ||
    typeof event.occurredAt !== 'string' ||
    Number.isNaN(Date.parse(event.occurredAt)) ||
    typeof event.source !== 'string' ||
    !allowedSources.has(event.source) ||
    !event.payload
  ) {
    return null
  }
  const safePayload = sanitizePayload(event.eventType, event.payload)
  if (!safePayload || JSON.stringify(safePayload).length > 20_000) return null
  return {
    clientEventId: event.clientEventId,
    deviceId: event.deviceId,
    eventType: event.eventType as
      | 'navigation'
      | 'form-submission'
      | 'learning-progress'
      | 'preference'
      | 'interaction',
    route: event.route,
    payload: safePayload,
    occurredAt: event.occurredAt,
    source: event.source as 'web' | 'pwa' | 'android' | 'desktop',
  }
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Request body must be valid JSON.' }, { status: 400 })
  }

  const submitted = (body as { events?: unknown })?.events
  if (!Array.isArray(submitted) || submitted.length < 1 || submitted.length > 50) {
    return Response.json({ error: 'Submit between 1 and 50 events.' }, { status: 400 })
  }
  const events = submitted.map(validateEvent)
  if (events.some((event) => event === null)) {
    return Response.json({ error: 'One or more events are invalid.' }, { status: 422 })
  }

  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: request.headers })
  const accepted: string[] = []

  for (const event of events) {
    if (!event) continue
    try {
      await payload.create({
        collection: 'sync-events',
        data: event,
        context: { syncRoute: true },
        overrideAccess: false,
        user,
      })
      accepted.push(event.clientEventId)
    } catch (error) {
      const message = error instanceof Error ? error.message.toLowerCase() : ''
      if (message.includes('unique') || message.includes('duplicate')) {
        accepted.push(event.clientEventId)
        continue
      }
      return Response.json(
        { accepted, error: 'Some saved activity could not be synchronized.' },
        { status: 409 },
      )
    }
  }

  return Response.json({ accepted })
}
