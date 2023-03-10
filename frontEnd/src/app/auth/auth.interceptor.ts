import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private UserService : UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = this.UserService.currentUser
    if(user.token){
      request = request.clone({
        setHeaders:{
          access_token : user.token
        }
      })
    }
    return next.handle(request);
  }
}
