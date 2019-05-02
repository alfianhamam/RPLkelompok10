import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadpicPage } from './uploadpic.page';

describe('UploadpicPage', () => {
  let component: UploadpicPage;
  let fixture: ComponentFixture<UploadpicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadpicPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadpicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
