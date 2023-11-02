import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reporting-isst',
  templateUrl: './reporting-isst.component.html',
  styleUrls: ['./reporting-isst.component.css']
})
export class ReportingISSTComponent implements OnInit{
  userName: string = '';

  constructor(private router:Router) {}

  ngOnInit(): void {
    let name = localStorage.getItem('userName');
    this.userName = name !== null ? name : '';
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['mainPage'])
  }
}
