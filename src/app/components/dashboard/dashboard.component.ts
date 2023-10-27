import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
 
  userName: string = '';

  constructor(private router: Router,
    private http: HttpClient) {
    let name = localStorage.getItem('userName');
    this.userName = name !== null ? name : '';
  }
  
  ngOnInit(): void {
      
  }


}
