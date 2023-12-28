import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerUpdateComponentComponent } from './seller-update-component.component';

describe('SellerUpdateComponentComponent', () => {
  let component: SellerUpdateComponentComponent;
  let fixture: ComponentFixture<SellerUpdateComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerUpdateComponentComponent]
    });
    fixture = TestBed.createComponent(SellerUpdateComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
