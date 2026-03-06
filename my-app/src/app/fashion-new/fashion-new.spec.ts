import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionNew } from './fashion-new';

describe('FashionNew', () => {
  let component: FashionNew;
  let fixture: ComponentFixture<FashionNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FashionNew]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FashionNew);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
