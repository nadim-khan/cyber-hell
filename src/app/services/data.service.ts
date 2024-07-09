import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  allCountryList = <any>[];

  public _selectedCountrySig: BehaviorSubject<any> = new BehaviorSubject<any>({ currentCountry: '' });
  country$ = this._selectedCountrySig.asObservable();

  public _emptyNewsCountrySig: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  emptyNewsCountry$ = this._emptyNewsCountrySig.asObservable();

  get country() {
    return this._selectedCountrySig.value;
  }

  get countryEmpty() {
    return this._emptyNewsCountrySig.value;
  }

  constructor() { }
}
