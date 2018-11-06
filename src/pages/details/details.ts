import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  private transaction;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {

    this.transaction = navParams.get('item');

  }

  ionViewDidLoad() {
  }

  dismiss() {
    let data = { };
    this.viewCtrl.dismiss(data);
  }

}
