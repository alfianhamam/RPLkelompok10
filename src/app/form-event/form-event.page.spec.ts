import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEventPage } from './form-event.page';

describe('FormEventPage', () => {
  let component: FormEventPage;
  let fixture: ComponentFixture<FormEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEventPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
