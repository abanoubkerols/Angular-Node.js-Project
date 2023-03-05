import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup
  isSubmitted = false
  returnURL = ''
  constructor(private formBuilder: FormBuilder, private userService: UserService , private activatedRoute:ActivatedRoute
    ,private  router : Router
    ) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],

    })

    this.returnURL = this.activatedRoute.snapshot.queryParams.returnURL
  }


  get Fc() {
    return this.loginForm.controls
  }

  submit() {
    this.isSubmitted = true
    if (this.loginForm.invalid) {
      return
    }

    this.userService.login({
      email: this.Fc.email.value,
      password: this.Fc.password.value
    }).subscribe(()=>{
      this.router.navigateByUrl(this.returnURL)
    })

  }
}
