import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: ['./account-balance.component.scss']
})
export class AccountBalanceComponent implements OnInit {
  @Input() user: any;
  date : any = null;
  day : any = null;
  month : any = null;
  year : any = null;

  constructor() { }

  ngOnInit(): void {
    this.date = new Date();
    this.day = this.date.getDate();
    this.month = Number(this.date.getMonth()) + 1;
    this.year = this.date.getFullYear();
  }

}
