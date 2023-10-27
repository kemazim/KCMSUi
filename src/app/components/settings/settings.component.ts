import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{
  userName: string = '';
  
  constructor(private router:Router,
    private http:HttpClient) {}

  ngOnInit(): void {
    let name = localStorage.getItem('userName');
    this.userName = name !== null ? name : '';
  }

  addUser() {
    this.router.navigate(['addUser'])
  }

  deleteUser() {
    this.router.navigate(['deleteUser'])
  }

  emailService() {
    this.router.navigate(['emailService'])
  }

  emailRecipient() {
    this.router.navigate(['emailRecipient'])
  }
}
