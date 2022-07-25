import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AppState} from "../store/state/app.state";
import {Store} from "@ngrx/store";
import {selectAuthCurrentUser} from "../store/selectors/auth.selectors";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private store: Store<AppState>) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean | Promise<boolean> {
    let check: boolean = false;
    this.store.select(selectAuthCurrentUser).subscribe((data) => {
      if (data !== null) check = true
    })
    if (check) {
      return true;
    }
    return this.router.navigateByUrl('/login');
  }
}
