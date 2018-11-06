import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {

  private filters = [];

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {

    this.filters = navParams.get('item');

  }

  ionViewDidLoad() {
  }

  dismiss() {
    let data = {};
    this.viewCtrl.dismiss("ESSE AE");
  }

}
