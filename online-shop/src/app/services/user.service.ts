import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CredentialsModel} from "../types/credentials.model";
import {Observable, tap} from "rxjs";
import {User} from "../types/user.model";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: User | undefined;

  redirectUrl: string | null = null;

  constructor(private http: HttpClient) {
  }

  login(credentials: CredentialsModel): Observable<User> {
    return this.http.post<User>(`${environment.url}/login`, credentials).pipe(tap((user) => {
      {
        this.currentUser = user
        localStorage.setItem("username", this.currentUser.username)
      }
    }))
  }

  isLoggedIn(): boolean {
    return this.currentUser !== undefined
  }
}
