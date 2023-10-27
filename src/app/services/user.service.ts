import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl: string = "https://localhost:7190/api/User/"

  constructor(private http: HttpClient) { }
}
