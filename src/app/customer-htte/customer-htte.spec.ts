import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerHtte } from './customer-htte';

describe('CustomerHtte', () => {
  let component: CustomerHtte;
  let fixture: ComponentFixture<CustomerHtte>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerHtte]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerHtte);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
