import { Component, ViewChild } from '@angular/core';
import { Platform, AlertController, App, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;

  constructor(public platform: Platform, public statusBar: StatusBar, splashScreen: SplashScreen,
    public alertCtrl: AlertController, public app: App, public menuCtrl: MenuController) {
    platform.ready().then(() => {

      this.statusBar.styleLightContent();
      this.statusBar.show();

      /**
       * SELECT SCHEMA ON FILE variables.scss TOO
       */

      // GREY SCHEMA
      // this.statusBar.backgroundColorByHexString("#b0bec5");

      // BLUE SCHEMA
      this.statusBar.backgroundColorByHexString("#81d4fa");

      // YELLOW SCHEMA
      // this.statusBar.backgroundColorByHexString("#fff59d");

      // GREEN SCHEMA
      // this.statusBar.backgroundColorByHexString("#a5d6a7");

      this.customBackButtonBehavior();
      splashScreen.hide();
    });
  }


  private customBackButtonBehavior() {
    this.platform.registerBackButtonAction(() => {
      this.showConfirm();
    });
  }

  private showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Deseja sair?',
      message: 'Ao confirmar você estará encerrando o aplicativo.',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            // confirm.dismiss();
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    confirm.present();
  }


}