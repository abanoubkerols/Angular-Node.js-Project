import { IuserRegister } from './../../../shared/interfaces/userRegister';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PasswordsMatchValidator } from 'src/app/shared/validator/password_match';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup
  isSubmitted = false

  returnUrl = ''

  constructor(private FormBuilder: FormBuilder, private UserService: UserService, private ActivatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.FormBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(10)]]
    }, {
      Validators: PasswordsMatchValidator('password', 'confirmPassword')
    })
    this.returnUrl = this.ActivatedRoute.snapshot.queryParams.returnUrl
  }
  get fc(){
    return this.registerForm.controls

  }

  submit(){
    this.isSubmitted = true

    if(this.registerForm.invalid){
      return
    }

    const fv = this.registerForm.value

    const user : IuserRegister = {
      name : fv.name,
      email : fv.email,
      password : fv.password,
      confirmPassword : fv.confirmPassword,
      address:fv.address
    }
    this.UserService.register(user).subscribe(()=>{
      this.router.navigateByUrl(this.returnUrl)
    })
  }
}


