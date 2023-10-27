import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporting-isst',
  templateUrl: './reporting-isst.component.html',
  styleUrls: ['./reporting-isst.component.css']
})
export class ReportingISSTComponent implements OnInit{
  userName: string = '';

  constructor(private http:HttpClient) {}

  ngOnInit(): void {
    let name = localStorage.getItem('userName');
    this.userName = name !== null ? name : '';
  }

}
