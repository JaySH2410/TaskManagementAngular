import {
  ApplicationConfig,
  // provideBrowserGlobalErrorListeners,
  // provideZoneChangeDetection,
} from '@angular/core';
// import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
// import { AuthInterceptor } from './services/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};

// providers: [
//   // provideBrowserGlobalErrorListeners(),
//   // provideZoneChangeDetection({ eventCoalescing: true }),
//   // provideRouter(routes)
//   provideRouter(routes),
//   // provideHttpClient(
//   //   withInterceptors([(req, next) => {
//   //     const token = localStorage.getItem('token');
//   //     if (token) {
//   //       const cloned = req.clone({
//   //         setHeaders: { Authorization: `Bearer ${token}` }
//   //       });
//   //       return next(cloned);
//   //     }
//   //     return next(req);
//   //   }])
//   // )
// ],
