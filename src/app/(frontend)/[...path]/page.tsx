import ChiyambiApp from '../chiyambi-app'
import { portalPaths } from '../portal-paths'

export const dynamicParams = true

export function generateStaticParams() {
  return portalPaths.map((path) => ({ path: path.split('/') }))
}

export default function PortalRoute() {
  return <ChiyambiApp />
}
