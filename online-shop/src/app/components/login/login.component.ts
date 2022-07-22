import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CredentialsModel} from "../../types/credentials.model";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup | undefined;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(4)]],
      password: ["", [Validators.required]],
    })
  }

  login() {
    if (!this.form?.invalid) {
      const credentials: CredentialsModel = {username: this.form?.value.username, password: this.form?.value.password}
      this.userService.login(credentials).subscribe((data) => {
        if (data.roles) {
          this.router.navigateByUrl(`/products`);
          alert("YOU ARE LOGGED")
        }
      }, () => {
        alert("YOUR CREDENTIALS ARE NOT CORRECT")
      })
    } else {
      alert(
        "YOUR CREDENTIALS ARE NOT CORRECT"
      )
    }
  }
}
