import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fashionadmin } from './fashionadmin';

describe('Fashionadmin', () => {
  let component: Fashionadmin;
  let fixture: ComponentFixture<Fashionadmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Fashionadmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fashionadmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
