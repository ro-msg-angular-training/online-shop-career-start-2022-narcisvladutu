import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductsListComponent} from './products-list.component';
import {RouterTestingModule} from "@angular/router/testing";
import {Store, StoreModule} from "@ngrx/store";
import {AppState} from "../../store/state/app.state";
import {selectAllProducts} from "../../store/selectors/products..selectors";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {initialProductsState} from "../../store/state/products.state";

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let store: Store<AppState>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsListComponent],
      imports: [RouterTestingModule,
        StoreModule.forRoot({})],
      providers: [provideMockStore({initialState: initialProductsState})]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(store).toBeTruthy()
  });
});
