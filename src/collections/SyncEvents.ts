import type { Access, CollectionConfig, FieldAccess } from 'payload'

const isPayloadAdmin: Access = ({ req }) => req.user?.collection === 'admins'
const isPayloadAdminField: FieldAccess = ({ req }) => req.user?.collection === 'admins'

export const SyncEvents: CollectionConfig = {
  slug: 'sync-events',
  access: {
    create: ({ req }) => req.context?.syncRoute === true,
    delete: isPayloadAdmin,
    read: isPayloadAdmin,
    update: isPayloadAdmin,
  },
  admin: {
    group: 'Platform operations',
    useAsTitle: 'clientEventId',
    defaultColumns: ['eventType', 'route', 'deviceId', 'occurredAt', 'status'],
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create') {
          data.serverReceivedAt = new Date().toISOString()
          data.status = 'received'
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'clientEventId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      maxLength: 80,
    },
    {
      name: 'deviceId',
      type: 'text',
      required: true,
      index: true,
      maxLength: 80,
    },
    {
      name: 'eventType',
      type: 'select',
      required: true,
      options: [
        { label: 'Navigation', value: 'navigation' },
        { label: 'Form submission', value: 'form-submission' },
        { label: 'Learning progress', value: 'learning-progress' },
        { label: 'Preference', value: 'preference' },
        { label: 'Interaction', value: 'interaction' },
      ],
    },
    {
      name: 'route',
      type: 'text',
      required: true,
      maxLength: 240,
      validate: (value: unknown) =>
        typeof value === 'string' && value.startsWith('/')
          ? true
          : 'Route must begin with a forward slash.',
    },
    {
      name: 'payload',
      type: 'json',
      validate: (value: unknown) => {
        if (value === null || value === undefined) return true
        if (typeof value !== 'object' || Array.isArray(value)) {
          return 'Payload must be an object.'
        }
        return JSON.stringify(value).length <= 20_000 ? true : 'Payload must be 20 KB or smaller.'
      },
    },
    {
      name: 'occurredAt',
      type: 'date',
      required: true,
      index: true,
    },
    {
      name: 'source',
      type: 'select',
      required: true,
      defaultValue: 'pwa',
      options: [
        { label: 'Web', value: 'web' },
        { label: 'Progressive web app', value: 'pwa' },
        { label: 'Android install', value: 'android' },
        { label: 'Desktop install', value: 'desktop' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'received',
      access: {
        create: isPayloadAdminField,
        update: isPayloadAdminField,
      },
      options: [
        { label: 'Received', value: 'received' },
        { label: 'Processed', value: 'processed' },
        { label: 'Rejected', value: 'rejected' },
      ],
    },
    {
      name: 'serverReceivedAt',
      type: 'date',
      access: {
        create: isPayloadAdminField,
        update: isPayloadAdminField,
      },
    },
  ],
  timestamps: true,
  versions: false,
}
