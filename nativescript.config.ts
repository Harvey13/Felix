import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.teamdraw',
  appPath: 'app',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
    maxLogcatObjectSize: 2048,
    discardUncaughtJsExceptions: true,
    packageName: 'com.tirageequipes.app'
  }
} as NativeScriptConfig;