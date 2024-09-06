import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { FormsModule } from '@angular/forms';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-exchange',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './exchange.component.html',
  styleUrl: './exchange.component.scss'
})
export class ExchangeComponent implements OnInit {
  first_currency: string = 'USD';
  second_currency: string = 'UAH';

  rate!: number;
  first_amount: number = 1;
  second_amount!: number;
  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.apiService.getRate(this.first_currency, this.second_currency).subscribe({next: (data: number)=> {this.rate = data
      this.calcSecondAmount()
    }, error: error=>console.error('Error fetching rate', error)})
  }

  onType(e: KeyboardEvent): void {
    if (e.target instanceof HTMLInputElement) {
      if (e.target.id === 'first_amount') {
        this.calcSecondAmount();
      } else {
        this.calcFirstAmount();
      }
    }
  }

  onChange(e: MatSelectChange): void {
    if(e.source.id === 'first_currency'){
      this.first_currency = e.value
      this.apiService.getRate(this.first_currency, this.second_currency).subscribe({next: (data: number)=> {this.rate = data
        this.calcSecondAmount()
      }, error: error=>console.error('Error fetching rate', error)})
    } else{
      this.second_currency = e.value
      this.apiService.getRate(this.first_currency, this.second_currency).subscribe({next: (data: number)=> {this.rate = data
        this.calcFirstAmount()
      }, error: error=>console.error('Error fetching rate', error)})
    }
  }

  calcFirstAmount(){
    const rawCurrency = this.second_amount / this.rate
    this.first_amount = parseFloat(rawCurrency.toFixed(2))
  }
  calcSecondAmount(){
    const rawCurrency = this.first_amount * this.rate
    this.second_amount = parseFloat(rawCurrency.toFixed(2))
  }

}
