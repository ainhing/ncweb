import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex19Service } from './ex19-service';

describe('Ex19Service', () => {
  let component: Ex19Service;
  let fixture: ComponentFixture<Ex19Service>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex19Service]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex19Service);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
