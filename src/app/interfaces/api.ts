export interface ConversionRates {
    [key: string]: number;
  }
export interface RatesResponse {
    base_code: string;
    conversion_rates: ConversionRates;
    documentation: string;
    result: string;
    terms_of_use: string;
    time_last_update_unix: number;
    time_last_update_utc: string;
    time_next_update_unix: number;
    time_next_update_utc: string;
}
export interface RateResponse {
    base_code: string;
    conversion_rate: number;
    documentation: string;
    result: string;
    target_code: string;
    terms_of_use: string;
    time_last_update_unix: number;
    time_last_update_utc: string;
    time_next_update_unix: number;
    time_next_update_utc: string;
}
