import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MailRecipient } from 'src/app/models/mailRecipient';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  private mailUrl: string = "https://localhost:7190/api/Email/"

  constructor(private http: HttpClient) { }

  getEmail() {
    return this.http.get<MailRecipient[]>(`${this.mailUrl}getEmails`)
  }
  
  addEmail(mail: any) {
    return this.http.post<any>(`${this.mailUrl}addEmail`, mail)
  }
}
