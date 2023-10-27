import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userName: string = '';

  constructor(private router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
    let name = localStorage.getItem('userName');
    this.userName = name !== null ? name : '';
  }

  backPage() {
    this.router.navigate(['settings'])
  }
}
