import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedDiagramsComponent } from './created-diagrams.component';

describe('CreatedDiagramsComponent', () => {
  let component: CreatedDiagramsComponent;
  let fixture: ComponentFixture<CreatedDiagramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedDiagramsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedDiagramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
