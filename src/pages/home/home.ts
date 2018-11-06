import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TransactionsProvider } from '../../providers/transactions/transactions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private transactions = [];
  private lazyList = [];

  constructor(public navCtrl: NavController, public transactionsProvider: TransactionsProvider) {

    transactionsProvider.getTransactions().then(
      (list) => {
        this.transactions = list;

        for (let i = 0; i < 4; i++) {
          this.lazyList.push(this.transactions[i]);
        }

      });

  }


  doInfinite(infiniteScroll) {

    setTimeout(() => {
      for (let i = 0; i < 2; i++) {
        if (this.lazyList.length !== this.transactions.length) {
          this.lazyList.push(this.transactions[this.lazyList.length]);
        }
      }

      infiniteScroll.complete();
    }, 500);
  }

}
