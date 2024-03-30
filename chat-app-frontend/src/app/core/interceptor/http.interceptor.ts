import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@env/environment';

export const HttpInterceptor: HttpInterceptorFn = (request, next) => {
    const url = `${environment.apiUrl}${request.url}`;
    request = request.clone({
        url: url,
    });
    return next(request);
};

