/**
 * @file : loader.service
 * ============================================+
 * Common loader service to show and hide loader
 */
 
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
 
/**
 * @class LoaderService
 * @desc A loader service for global loader to show and hide
 */
export class LoaderService {
 
  public loader = new Subject(); // loader subject for multicast
  public show=true;
  constructor() { }
 
  hide() {
    this.show = false;
  }
 
  display() {
    this.show = true;
  }
  /**
   * @method showloader
   * @desc method call to show loader by multicast to observers.
   * Passing `true` as param to `next` mehtod to show loader
   */
  showLoader() {
    this.loader.next(true);
  }
 
  /**
   * @method showloader
   * @desc method call to hide loader by multicast to observers.
   * Passing `false` as param to `next` mehtod to hide loader
   */
  hideLoader() {
    this.loader.next(false);
  }
 
}