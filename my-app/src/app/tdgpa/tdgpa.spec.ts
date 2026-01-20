import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tdgpa } from './tdgpa';

describe('Tdgpa', () => {
  let component: Tdgpa;
  let fixture: ComponentFixture<Tdgpa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tdgpa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tdgpa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
