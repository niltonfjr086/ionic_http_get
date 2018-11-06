import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
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
  private loading;

  constructor(public navCtrl: NavController, public transactionsProvider: TransactionsProvider, public modalCtrl: ModalController,
    private alertCtrl: AlertController, public loadingCtrl: LoadingController) {

    this.buildLoadingCtrl();
    transactionsProvider.getTransactions()
      .then((list) => {
        this.transactions = list;
        this.buildPagination();
        this.loading.dismiss();
      }).catch((e) => { console.error(e); this.presentAlert(); this.loading.dismiss(); });

  }

  private buildLoadingCtrl() {
    this.loading = this.loadingCtrl.create({
      content: 'Carregando dados...'
    });
    this.loading.present();
  }

  private buildPagination() {
    this.paginatedList = [];
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
    this.buildLoadingCtrl();
    this.transactionsProvider.getTransactions()
      .then((list) => {

        let filterModal = this.modalCtrl.create(FilterPage, { item: list });
        filterModal.onDidDismiss((filteredList) => {
          this.transactions = filteredList;
          this.buildPagination();
          this.loading.dismiss();
        });
        filterModal.present();

      }).catch((e) => { console.error(e); this.presentAlert(); this.loading.dismiss();});

  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Erro de retorno',
      subTitle: 'Ao requisitar os dados o servidor retornou um erro, verifique a conexão e tente novamente.',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            alert = null;
          }
        }
      ]
    });
    alert.present();
  }

}
