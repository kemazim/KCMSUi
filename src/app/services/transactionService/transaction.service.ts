import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transUrl: string = "http://localhost:7177/api/Transaction/"

  constructor(private http: HttpClient) { }

  getTransactions() {
    return this.http.get<any[]>(`${this.transUrl}getTransactions`)
  }

  getSingleTransaction(transNo : string) {
    return this.http.post<any>(`${this.transUrl}getTransaction`, transNo)
  }
}
