import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SdlcComponent } from './pages/sdlc/sdlc.component';
import { AllFilesComponent } from './pages/all-files/all-files.component';
import { SrsFormComponent } from './pages/sdlc/srs-form/srs-form.component';
import { PcFormComponent } from './pages/sdlc/pc-form/pc-form.component';
import { SddFormComponent } from './pages/sdlc/sdd-form/sdd-form.component';
import { PhaseDetailsComponent } from './pages/sdlc/phase-details/phase-details.component';
import { DocumentDetailsComponent } from './pages/sdlc/document-details/document-details.component';
import { DocDetailsPcComponent } from './pages/sdlc/doc-details-pc/doc-details-pc.component';
import { DocDetailsSrsComponent } from './pages/sdlc/doc-details-srs/doc-details-srs.component';
import { AuthDetailsGuard } from './auth-details.guard';
import { AuthFormsGuard } from './auth-forms.guard'

const routes: Routes = [
  {path:'' , redirectTo:'sdlc' , pathMatch:'full'},
  {path:'sdlc' , component:SdlcComponent , children:[
    {path:"forms" , component: PhaseDetailsComponent , canActivate:[AuthFormsGuard] , children:[
      {path: "pcForm", component: PcFormComponent},
      {path: "srsForm", component: SrsFormComponent},
      {path: "sddForm", component: SddFormComponent}
    ]},
    {path:"details" , component:DocumentDetailsComponent , canActivate:[AuthDetailsGuard] , children:[
      {path: "pcDetails/:id", component: DocDetailsPcComponent},
      {path: "srsDetails/:id", component: DocDetailsSrsComponent}
    ]}
  ]},
  {path:'allfiles' , component:AllFilesComponent},
  {path:'**' , redirectTo:'sdlc' , pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
