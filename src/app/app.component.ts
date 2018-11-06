import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, public statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {

      this.statusBar.styleLightContent();
      this.statusBar.show();

      // this.statusBar.backgroundColorByHexString(this.sassReadColorProperty('danger'));

      splashScreen.hide();
    });
  }

  // private sassReadColorProperty(name: string): string {
  // 	return ((window.getComputedStyle(document.body).getPropertyValue('--' + name)).trim());
  // }

}