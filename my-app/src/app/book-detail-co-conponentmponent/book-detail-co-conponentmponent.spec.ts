import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailCoConponentmponent } from './book-detail-co-conponentmponent';

describe('BookDetailCoConponentmponent', () => {
  let component: BookDetailCoConponentmponent;
  let fixture: ComponentFixture<BookDetailCoConponentmponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookDetailCoConponentmponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookDetailCoConponentmponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
