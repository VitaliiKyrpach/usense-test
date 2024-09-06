import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ConversionRates } from '../../interfaces/api';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  usd!: number;
  eur!: number;
  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.apiService.getAll().subscribe({next: (data: ConversionRates)=>{
      this.usd = parseFloat(this.calcUAH(data['USD']).toFixed(2))
      this.eur = parseFloat(this.calcUAH(data['EUR']).toFixed(2))
    }, error: error=>console.error('Error fetching rate', error)})
  }

  calcUAH(rate: number): number{
    return 1/rate
  }
}
