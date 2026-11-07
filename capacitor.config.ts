import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.streamtube.app',
  appName: 'StreamTube',
  webDir: 'android-web',
  server: {
    url: 'https://video-platform-development.vercel.app',
    cleartext: false,
    androidScheme: 'https',
  },
}

export default config
