import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/users';
import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  userName: string = '';
  userId: string = '';
  userDetails!: Users;
  loginDate!: any;
  lastChangePws!: any;
  isLoading!: boolean;

  changePasswordForm!: FormGroup;
  changePwdRequest = {};

  constructor(private router: Router,
    private userService: UserService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    let name = localStorage.getItem('userName');
    this.userName = name !== null ? name : '';
    this.isLoading = true;

    let id = localStorage.getItem('userId');
    this.userId = id !== null ? id : '';
    this.loadUserDetails(this.userId)

    this.changePwdValidator();

  }

  changePwdValidator() {
    this.changePasswordForm = this.fb.group({
      prevPwd: ['', [Validators.required]],
      pwd: ['', [Validators.required, Validators.minLength(5)]],
      confirmPwd: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  changePassword() {
    if (this.changePasswordForm.status == 'INVALID') {
      alert("Please make sure New Password and Re-enter Password more than 5 char")
    } else {
      if (this.changePasswordForm.value.pwd != this.changePasswordForm.value.confirmPwd) {
        alert("New Password and Re-enter password not match");
      } else {
        this.changePwdRequest = {
          userId: this.userId,
          currentPassword: this.changePasswordForm.value.prevPwd,
          newPassword: this.changePasswordForm.value.pwd
        }
        this.userService.changePassword(this.changePwdRequest).subscribe({
          next: (res) => {
            alert("Password successfully changed");
            this.loadUserDetails(this.userId);
            window.location.reload();
          },
          error: (err) => {
            alert(err?.error.message);
            this.changePasswordForm.reset();
          }
        })
      }
    }
  }

  loadUserDetails(userId: string) {
    this.userService.getUserDetails(userId).subscribe(result => {
      this.userDetails = result;

      const datepipe = new DatePipe('en-US')

      this.loginDate = this.userDetails.lastLogin;
      this.lastChangePws = this.userDetails.lastChangePass

      //change login date & lastchangepws to dd/mm/yyyy
      this.loginDate = datepipe.transform(this.loginDate, 'dd/MM/yyyy')
      this.lastChangePws = datepipe.transform(this.lastChangePws, 'dd/MM/yyyy')

      this.isLoading = false;
    })
  }


  backPage() {
    this.router.navigate(['dashboard'])
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['mainPage'])
  }
}
