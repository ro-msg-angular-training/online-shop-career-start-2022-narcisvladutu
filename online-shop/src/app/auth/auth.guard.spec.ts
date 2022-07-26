import {TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {RouterTestingModule} from "@angular/router/testing";
import {StoreModule} from "@ngrx/store";
import {MockStore, provideMockStore} from "@ngrx/store/testing";


describe('AuthGuard', () => {
  let guard: AuthGuard;
  let store: MockStore;
  const initialState = {loggedIn: false};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        StoreModule.forRoot({})],
      providers: [provideMockStore({initialState})]
    });

    store = TestBed.inject(MockStore);
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
    expect(store).toBeTruthy();
  });
});
