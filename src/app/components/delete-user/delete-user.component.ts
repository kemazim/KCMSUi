import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
  
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
