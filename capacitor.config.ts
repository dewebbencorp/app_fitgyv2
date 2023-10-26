import { CapacitorConfig } from '@capacitor/cli';
import { ScreenOrientation } from '@capacitor/screen-orientation';

// Lock the orientation when the app loads
ScreenOrientation.lock({ orientation: 'portrait' });

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'app_fitgymV2',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
