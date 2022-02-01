import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {

  username!: string;
  password!: string;
  newUsername!: string;
  newPassword!: string;

  // constructor(private instructorService: InstructorService, private router: Router) { }
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(){

    console.log("login");
    //console.log(this.username + "--" + this.password);
    this.authService.login(this.username, this.password, "student").subscribe(
      (res) => {
        alert("logged in successfully");
        // this.router.navigateByUrl('login');
      }
    );

    this.username = '';
    this.password = '';
  }

  onLogout(){
    this.authService.logOut();
  }

  onRegister(){
    this.authService.register(this.newUsername, this.newPassword, "student").subscribe(
      (res) => {
        alert(res);
      }
    )

    this.newUsername = '';
    this.newPassword = '';
  }



}
