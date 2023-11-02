import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl: string = "https://localhost:7190/api/User/"

  constructor(private http: HttpClient) { }

  addUser(user: any) {
    return this.http.post<any>(`${this.userUrl}register`, user)
  }

  login(userLogin: any) {
    return this.http.post<any>(`${this.userUrl}authenticate`, userLogin)
  }

  changePassword(passwordDetails: any) {
    return this.http.post<any>(`${this.userUrl}changePassword`, passwordDetails)
  }

  deleteUser(id: any) {
    return this.http.delete<any>(`${this.userUrl}deleteUser?userId=`+id)
  }

  getUsers() {
    return this.http.get<Users[]>(`${this.userUrl}getUsers`)
  }

  getUserDetails(id: any) {
    return this.http.get<Users>(`${this.userUrl}getUserDetails?userId=`+ id)
  }

}
