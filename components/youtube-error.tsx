import { AlertCircle } from 'lucide-react'

export function YouTubeError({ message }: { message: string }) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-3 px-6 py-20 text-center">
      <AlertCircle className="size-10 text-muted-foreground" aria-hidden="true" />
      <h2 className="text-lg font-semibold">Videos are unavailable</h2>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  )
}
