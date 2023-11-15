import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sw30.habigniter',
  appName: 'Habigniter',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      splashFullScreen: false,
      splashImmersive: false
    }
  }
};

export default config;
