import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TransactionsProvider {

  constructor(public http: HttpClient) {
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

  public getFilteredTransactions(param) {

    // let arrayParams = [], parameterized;
    // for (const key in options) {
    //   if(options[key] && options[key].length > 0)
    //   arrayParams.push(key + "=" + options[key]);
    // }
    // let params = "?" + arrayParams.join("&");

    let observable = this.http.get("https://nix-bank-qa.cloudint.nexxera.com/v1/transactions?" + param.name + "=" + param.value);

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
