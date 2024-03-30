import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: InjectionToken<object>,
    @Inject('LOCALSTORAGE') private localStorage: Storage,
  ) { }

  /**
   * Gets localStorage value
   * @param key Key name through which value can be accessed
   */
  get(key: string): any {
    if (isPlatformBrowser(this.platformId)) {
      return this.localStorage.getItem(key);
    }
  }

  /**
   * Sets localStorage value
   * @param key Key name through which value can be accessed
   * @param value LocalStorage value
   */
  set(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.localStorage.setItem(key, value);
    }
  }

  /**
   * Removes localStorage of particular key
   * @param key Key name through which value can be accessed
   */
  remove(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.localStorage.removeItem(key);
    }
  }

  /**
   * Empties the list stored in window localStorage with the object of all key/value pairs, if localStorage are there.
   */
  clear(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.localStorage.clear();
    }
  }
}
