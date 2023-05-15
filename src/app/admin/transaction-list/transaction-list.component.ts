import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environments'
import { Transaction } from '../models/student';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent {
  private baseUrl?: string;
  transactions?:Transaction[]=[];

  constructor(private readonly httpService:HttpClient){
    this.baseUrl=environment.baseUrl;

  }

  ngOnInit(){
    this.getTransactions();
  }

  getTransactions(){

    this.httpService.get<Transaction[]>(`${this.baseUrl}/booking/transactionlist`)
    .subscribe((x:Transaction[])=>{
      this.transactions=x;
    })
  }
}
