import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpErrorInterceptor } from '@interceptor/http-error.interceptor';
import { HttpInterceptor } from '@interceptor/http.interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      BrowserModule,
      HttpClientModule
    ),
    provideAnimationsAsync(),
    { provide: 'LOCALSTORAGE', useFactory: getLocalStorage },
    provideHttpClient(withInterceptors([HttpInterceptor, HttpErrorInterceptor])),
  ]
};

function getLocalStorage() {
  return typeof window !== 'undefined' ? window.localStorage : null;
}
