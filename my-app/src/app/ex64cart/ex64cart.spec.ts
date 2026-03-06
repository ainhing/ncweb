import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex64cart } from './ex64cart';

describe('Ex64cart', () => {
  let component: Ex64cart;
  let fixture: ComponentFixture<Ex64cart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex64cart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex64cart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
