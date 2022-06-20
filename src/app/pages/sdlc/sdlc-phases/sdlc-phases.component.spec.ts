import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdlcPhasesComponent } from './sdlc-phases.component';

describe('SdlcPhasesComponent', () => {
  let component: SdlcPhasesComponent;
  let fixture: ComponentFixture<SdlcPhasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SdlcPhasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SdlcPhasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
