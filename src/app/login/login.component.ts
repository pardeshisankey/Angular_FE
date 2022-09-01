import { TokenStorageService } from './../_services/tokenStorage.service';
import { Router } from '@angular/router';
import { SankeyUserService } from '../_services/sankeyuser.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  invalidLogin = false
  errorMessage = ''
  flag: boolean = true;

  constructor(private router: Router,
    private fb: FormBuilder,
    private sankeyUserService: SankeyUserService,
    private tokenStorageService: TokenStorageService
    ) { }

  ngOnInit(): void {
      this.loginForm = this.fb.group({
        email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        password: [null, [Validators.required, Validators.minLength(6)]],
      });
  }


  onSubmit() {
    if(this.loginForm.invalid){
      this.invalidLogin = true
      this.errorMessage = 'You must enter valid login credentials'
      return;
    } else {
      this.sankeyUserService.loginSankeyUser(this.loginForm.value).subscribe({
        next: (response) => {
          const token = response.body.token
          this.tokenStorageService.saveToken(token)
          console.log('Token', token)
          this.router.navigate(['homepage'])
        },
        error: (error) => {
          console.error('Invalid Credentials')
          this.errorMessage = error
          this.invalidLogin = true
        }
      }
      )
    }
  }


}
