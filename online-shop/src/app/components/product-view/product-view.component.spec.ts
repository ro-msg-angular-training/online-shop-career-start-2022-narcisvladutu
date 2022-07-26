import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductViewComponent } from './product-view.component';
import {RouterTestingModule} from "@angular/router/testing";
import { StoreModule } from '@ngrx/store';

describe('ProductViewComponent', () => {
  let component: ProductViewComponent;
  let fixture: ComponentFixture<ProductViewComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({})
      ],
      providers:[],
      declarations: [
        ProductViewComponent
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
