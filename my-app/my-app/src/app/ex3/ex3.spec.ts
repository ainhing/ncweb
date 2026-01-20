import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex3 } from './ex3';

describe('Ex3', () => {
  let component: Ex3;
  let fixture: ComponentFixture<Ex3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex3);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
