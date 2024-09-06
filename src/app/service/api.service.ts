import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ConversionRates, RateResponse, RatesResponse } from '../interfaces/api';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<ConversionRates>{
    return this.http.get<RatesResponse>('https://v6.exchangerate-api.com/v6/cf09dbca6a177371f41b1a15/latest/UAH')
    .pipe(map((data: RatesResponse)=>{
      return data.conversion_rates
    }))
  }

  getRate(first: string, second: string): Observable<number>{
    return this.http.get<RateResponse>(`https://v6.exchangerate-api.com/v6/cf09dbca6a177371f41b1a15/pair/${first}/${second}`)
    .pipe(map((data: RateResponse)=>{
      return data.conversion_rate
    }))
  }
}
