import { IuserRegister } from './../shared/interfaces/userRegister';

import { USER_LOGIN_URL, USER_REGISTER_URL } from './../shared/constants/urls';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUserLogin } from '../shared/interfaces/IuserLogin';
import { User } from '../shared/models/user';

const User_KEY = "User"

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage())
  public userObservable: Observable<User>
  constructor(private http: HttpClient) {
    this.userObservable = this.userSubject.asObservable()

  }

  public get currentUser():User{
    return this.userSubject.value
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user)
          this.userSubject.next(user)


        },
        error: () => {

        }
      })
    )

  }
  register(userRegister: IuserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user)
          this.userSubject.next(user)

        }
      })
    )

  }

  logOut() {
    this.userSubject.next(new User())
    localStorage.removeItem(User_KEY)
    window.location.reload()
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(User_KEY, JSON.stringify(user))
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(User_KEY)
    if (userJson) {
      return JSON.parse(userJson) as User
    } else {
      return new User()
    }

  }



}
