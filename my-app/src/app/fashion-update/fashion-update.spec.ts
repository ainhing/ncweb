import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionUpdate } from './fashion-update';

describe('FashionUpdate', () => {
  let component: FashionUpdate;
  let fixture: ComponentFixture<FashionUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FashionUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FashionUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
