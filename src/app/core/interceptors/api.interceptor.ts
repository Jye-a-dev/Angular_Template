import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ENV } from '../config/env';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const isApiRequest = !req.url.startsWith('http://') && !req.url.startsWith('https://');
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

  let headers = req.headers;
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  const modifiedReq = req.clone({
    url: isApiRequest
      ? `${ENV.apiBaseUrl}${req.url.startsWith('/') ? '' : '/'}${req.url}`
      : req.url,
    headers,
  });

  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('[API Error]:', error.status, error.message);
      return throwError(() => error);
    }),
  );
};
