import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex64productlist } from './ex64productlist';

describe('Ex64productlist', () => {
  let component: Ex64productlist;
  let fixture: ComponentFixture<Ex64productlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex64productlist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex64productlist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
