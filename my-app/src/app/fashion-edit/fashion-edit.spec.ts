import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionEdit } from './fashion-edit';

describe('FashionEdit', () => {
  let component: FashionEdit;
  let fixture: ComponentFixture<FashionEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FashionEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FashionEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
