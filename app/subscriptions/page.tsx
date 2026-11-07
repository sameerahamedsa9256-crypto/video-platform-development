import type { Metadata } from 'next'
import { SubscriptionsFeed } from '@/components/subscriptions-feed'

export const metadata: Metadata = { title: 'Subscriptions — StreamTube' }

export default function SubscriptionsPage() {
  return (
    <div className="px-4 py-4">
      <h1 className="mb-4 text-xl font-bold">Subscriptions</h1>
      <SubscriptionsFeed />
    </div>
  )
}
