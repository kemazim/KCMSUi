import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
 
  userName: string = '';
  lastLogin: string = '';

  constructor(private router: Router) {
    let name = localStorage.getItem('username');
    let dateLogin = localStorage.getItem('lastLogin');
    this.userName = name !== null ? name : '';
    this.lastLogin = dateLogin !== null ? dateLogin : '';

  }
  
  ngOnInit(): void {
      
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['mainPage'])
  }

  addRecord(){
    this.router.navigate(['addRecord'])
  }

  deleteRecord() {
    this.router.navigate(['deleteRecord'])
  }

  searchRecord() {
    this.router.navigate(['searchRecord'])
  }

  reporting() {
    this.router.navigate(['dashboard'])
  }
}
