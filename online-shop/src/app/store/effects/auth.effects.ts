import {Actions, createEffect, ofType} from "@ngrx/effects";
import {UserService} from "../../services/user.service";
import {Injectable} from "@angular/core";
import {loginUser, loginUserFailure, loginUserSuccess} from "../actions/auth.actions";
import {catchError, switchMap} from "rxjs/operators";
import {map, of, tap} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class AuthEffects {
  constructor(
    private authService: UserService,
    private actions$: Actions,
    private router: Router
  ) {}


  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      switchMap((props) =>
        this.authService.login(props.userCredentials).pipe(
          map((data) => loginUserSuccess({user: data})),
          catchError((err) => of(loginUserFailure({error: err})))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginUserSuccess),
        tap((props) => {
          alert("YOU ARE LOGGED IN!")
          this.router.navigateByUrl('/products').then();
        })
      ),
    { dispatch: false }
  );

  loginError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginUserFailure),
        tap(() => alert("YOUR CREDENTIALS DOESN'T EXIST!"))
      ),
    { dispatch: false }
  );

}
