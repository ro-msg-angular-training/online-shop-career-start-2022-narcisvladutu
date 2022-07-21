import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CredentialsModel} from "../types/credentials.model";
import {Observable} from "rxjs";
import {User} from "../types/user.model";
import {url} from "../utils";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(credentials: CredentialsModel): Observable<User> {
    return this.http.post<User>(`${url}/login`, credentials)
  }
}
