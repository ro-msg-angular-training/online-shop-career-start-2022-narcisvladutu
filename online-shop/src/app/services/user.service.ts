import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CredentialsModel} from "../types/credentials.model";
import {Observable, tap} from "rxjs";
import {Role, User} from "../types/user.model";
import {url} from "../utils";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: User | undefined;

  redirectUrl: string | null = null;

  constructor(private http: HttpClient) {
  }

  login(credentials: CredentialsModel): Observable<User> {
    return this.http.post<User>(`${url}/login`, credentials).pipe(tap((user) => {
      {
        this.currentUser = user
        localStorage.setItem("username", this.currentUser.username)
      }
    }))
  }

  isLoggedIn() {
    return this.currentUser != undefined
  }

  hasRoleType(role: Role) {
    return !!this.currentUser?.roles.includes(role);
  }
}
