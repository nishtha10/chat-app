import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { ERROR_CODE, MESSAGE_TYPE } from "@app/core/constants/app.constant";
import { AuthService } from "@app/core/services/auth.service";
import { ToasterService } from "@app/core/services/toaster.service";
import { catchError } from "rxjs";

export const HttpErrorInterceptor: HttpInterceptorFn = (request, next) => {
    const authenticationService = inject(AuthService);
    const router = inject(Router);
    const toasterService = inject(ToasterService);
  
    return next(request)
      .pipe(catchError((error: HttpErrorResponse) => {
        if (error.status === ERROR_CODE.serverTimeOut) {
          router.navigate(['/error/time-out'], {
            queryParams: { lastVisitedUrl: router.url },
          });
        } else if (error?.status === ERROR_CODE.unauthorized || error?.status === ERROR_CODE.forbidden) {
          authenticationService.logoutUser();
        }
        toasterService.displaySnackBar(error?.error?.message, MESSAGE_TYPE.error);
        const err = error.error || error;
        throw err;
      }));
  };
  
  const isUserLoggedIn = (token: string): boolean => {
    return !!token;
  }