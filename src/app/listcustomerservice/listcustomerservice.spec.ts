import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listcustomerservice } from './listcustomerservice';

describe('Listcustomerservice', () => {
  let component: Listcustomerservice;
  let fixture: ComponentFixture<Listcustomerservice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Listcustomerservice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Listcustomerservice);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
