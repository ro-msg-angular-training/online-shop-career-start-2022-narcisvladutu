import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CredentialsModel} from "../../types/credentials.model";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/state/app.state";
import {loginUser} from "../../store/actions/auth.actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup | undefined;

  constructor(private fb: FormBuilder, private router: Router,
              private store: Store<AppState>) {
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
      this.store.dispatch(loginUser({userCredentials: credentials}))
    } else {
      alert(
        "YOUR CREDENTIALS ARE NOT CORRECT"
      )
    }
  }
}
