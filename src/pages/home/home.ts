import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { TransactionsProvider } from '../../providers/transactions/transactions';
import { DetailsPage } from '../details/details';
import { FilterPage } from '../filter/filter';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private transactions = [];
  private paginatedList = [];

  constructor(public navCtrl: NavController, public transactionsProvider: TransactionsProvider, public modalCtrl: ModalController) {

    transactionsProvider.getTransactions()
      .then((list) => {
        this.transactions = list;
        this.buildPagination();
      });

  }

  private buildPagination() {
    let page = 0;
    this.transactions.forEach((item, index) => {
      if (index % 3 === 0) {
        this.paginatedList.push([]);
        if (index !== 0) {
          page++;
        }
      }
      this.paginatedList[page].push(item);
    });
  }


  presentDetailsModal(transaction) {
    let detailModal = this.modalCtrl.create(DetailsPage, { item: transaction });
    detailModal.present();
  }

  presentFilterModal() {
    let filterModal = this.modalCtrl.create(FilterPage, { item: this.transactions });
    filterModal.onDidDismiss((res)=>{console.log(res)});
    filterModal.present();
  }

}
