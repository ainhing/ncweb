import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionDelete } from './fashion-delete';

describe('FashionDelete', () => {
  let component: FashionDelete;
  let fixture: ComponentFixture<FashionDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FashionDelete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FashionDelete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
