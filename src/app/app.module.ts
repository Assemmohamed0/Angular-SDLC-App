import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { CreatedDocsComponent } from './pages/sdlc/created-docs/created-docs.component';
import { PhaseDetailsComponent } from './pages/sdlc/phase-details/phase-details.component';
import { SdlcPhasesComponent } from './pages/sdlc/sdlc-phases/sdlc-phases.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { SdlcComponent } from './pages/sdlc/sdlc.component';
import { AllFilesComponent } from './pages/all-files/all-files.component';
import { DiagramDetailsComponent } from './pages/all-files/diagram-details/diagram-details.component';
import { DocumentDetailsComponent } from './pages/sdlc/document-details/document-details.component';
import { CreatedDiagramsComponent } from './pages/all-files/created-diagrams/created-diagrams.component';
import { PcFormComponent } from './pages/sdlc/pc-form/pc-form.component';
import { SrsFormComponent } from './pages/sdlc/srs-form/srs-form.component';
import { SddFormComponent } from './pages/sdlc/sdd-form/sdd-form.component';
import { DocDetailsPcComponent } from './pages/sdlc/doc-details-pc/doc-details-pc.component';
import { DocDetailsSrsComponent } from './pages/sdlc/doc-details-srs/doc-details-srs.component';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CreatedDocsComponent,
    PhaseDetailsComponent,
    SdlcPhasesComponent,
    SdlcComponent,
    AllFilesComponent,
    DiagramDetailsComponent,
    DocumentDetailsComponent,
    CreatedDiagramsComponent,
    PcFormComponent,
    SrsFormComponent,
    SddFormComponent,
    DocDetailsPcComponent,
    DocDetailsSrsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
