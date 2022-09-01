import { SankeyUserService } from '../_services/sankeyuser.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  invalidRegister = false
  errorMessage = ''
  flag: boolean = true

  constructor(private router: Router, private fb: FormBuilder, private sankeyUserService: SankeyUserService) { }

  ngOnInit(): void {
    this.initForm()
  }

  private initForm() {
    this.registerForm = this.fb.group({
      'firstName': [''],
      'lastName': [''],
      'username': [''],
      'email': ['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      'password': ['',[Validators.required, Validators.minLength(6)]],
      'address': [''],
      'city': [''],
      'phoneNo': [''],
      'hobbies': this.fb.array([this.newHobby()])
    });

  }

  onSubmit() {
    if (this.registerForm.valid === false){
      this.invalidRegister = true
      this.errorMessage = 'You must fill in all the fields!'
    } else {
      this.invalidRegister = false
      const user = this.registerForm.value
      this.sankeyUserService.createSankeyUser(user).subscribe({
        next: (response) => {
          console.log(response)
          this.router.navigate(['login'])
          console.log('Register Form Submitted!')
        },
        error: (error) => {
          console.log(error)
        }
      })
    }


  }

  get hobbies(): FormArray {
    return this.registerForm.get('hobbies') as FormArray
  }

  newHobby(): FormGroup {
    return this.fb.group({
      hobby: ''
    })
  }

  addHobby() {
    console.log(this.hobbies)
    this.hobbies.push(this.newHobby())
  }

  removeHobby(i: number) {
    this.hobbies.removeAt(i)
  }


}
