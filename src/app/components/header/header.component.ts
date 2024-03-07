import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  userName: string = '';

  constructor() {}

  ngOnInit(): void {
      let name = localStorage.getItem('username');
      this.userName = name !== null ? name : '';
  }
}
