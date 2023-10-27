import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-service',
  templateUrl: './email-service.component.html',
  styleUrls: ['./email-service.component.css']
})
export class EmailServiceComponent implements OnInit{

  constructor(private router:Router) {}

  ngOnInit(): void {
      
  }

  backPage() {
    this.router.navigate(['settings'])
  }
}
