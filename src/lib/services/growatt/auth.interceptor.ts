import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

// Interceptor que adiciona o token de autenticação em todas as requests para a API Growatt
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith(environment.apiBaseUrl) && environment.apiToken) {
    const clonedReq = req.clone({
      setHeaders: {
        token: environment.apiToken,
      },
    });
    return next(clonedReq);
  }

  return next(req);
};
