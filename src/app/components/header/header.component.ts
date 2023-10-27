import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  userName: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
      let name = localStorage.getItem('userName');
      this.userName = name !== null ? name : '';
      console.log(this.userName)
  }
}
