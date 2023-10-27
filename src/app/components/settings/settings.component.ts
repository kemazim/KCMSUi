import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{
  
  constructor(private router:Router) {}

  ngOnInit(): void {
      
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
