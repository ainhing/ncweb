import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex19List } from './ex19-list';

describe('Ex19List', () => {
  let component: Ex19List;
  let fixture: ComponentFixture<Ex19List>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex19List]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex19List);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
