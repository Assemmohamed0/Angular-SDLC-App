import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedDocsComponent } from './created-docs.component';

describe('CreatedDocsComponent', () => {
  let component: CreatedDocsComponent;
  let fixture: ComponentFixture<CreatedDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
