import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fashiondetail58 } from './fashiondetail58';

describe('Fashiondetail58', () => {
  let component: Fashiondetail58;
  let fixture: ComponentFixture<Fashiondetail58>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Fashiondetail58]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fashiondetail58);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
