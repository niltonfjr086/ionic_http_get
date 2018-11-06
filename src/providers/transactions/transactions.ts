import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TransactionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TransactionsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello TransactionsProvider Provider');
  }



  public getTransactions() {

    let observable = this.http.get("https://nix-bank-qa.cloudint.nexxera.com/v1/transactions");

    return observable.toPromise<{}>()
      .then((jsonResponse) => {
        let response = jsonResponse['data'];
        if (response) {
          return response;

        } else {
          return null;
        }
      }).catch((e) => { throw 'getTransactions: ' + e });


  }

}
