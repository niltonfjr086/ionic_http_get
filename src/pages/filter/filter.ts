import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { TransactionsProvider } from '../../providers/transactions/transactions';

@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {

  private filters = { tipo: [], nome_beneficiario: [], nome_pagador: [], status: [] };
  private filterParams = { tipo: "", nome_beneficiario: "", nome_pagador: "", status: "" };
  private filteredList = [];
  private loading;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, public transactionsProvider: TransactionsProvider,
    private alertCtrl: AlertController, public loadingCtrl: LoadingController) {

    this.filteredList = navParams.get('item');
    this.buildLoadingCtrl();
    this.buildFilters();
    this.loading.dismiss();

  }
  private buildLoadingCtrl() {
    this.loading = this.loadingCtrl.create({
      content: 'Carregando dados...'
    });
    this.loading.present();
  }

  buildFilters() {
    this.filteredList.forEach(item => {

      this.filters.tipo.push(item.tipo.toUpperCase());
      this.filters.nome_beneficiario.push(item.beneficiario.nome);
      this.filters.nome_pagador.push(item.pagador.nome);
      this.filters.status.push(item.status.toUpperCase());

    });

    this.filters.tipo = Array.from(new Set(this.filters.tipo)).sort();
    this.filters.nome_beneficiario = Array.from(new Set(this.filters.nome_beneficiario)).sort();
    this.filters.nome_pagador = Array.from(new Set(this.filters.nome_pagador)).sort();
    this.filters.status = Array.from(new Set(this.filters.status)).sort();

  }

  setParamType(event, type) {
    for (const key in this.filterParams) {
      if (key !== type) {
        this.filterParams[key] = "";
      }
    }
  }

  search() {
    this.buildLoadingCtrl();

    let param = { name: "", value: "" };

    for (const key in this.filterParams) {
      if (this.filterParams[key] && this.filterParams[key].length > 0) {
        param.name = key;
        param.value = this.filterParams[key].toLowerCase();
      }
    }
    this.transactionsProvider.getFilteredTransactions(param)
      .then((list) => { this.filteredList = list; this.dismiss(); this.loading.dismiss(); })
      .catch((e) => { console.error(e); this.presentAlert(); this.loading.dismiss();});
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

  dismiss() {
    this.viewCtrl.dismiss(this.filteredList);
  }

}
