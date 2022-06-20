import { Component, OnInit } from '@angular/core';
import { InitiationDetails } from '../../../interfaces/initiation-details';
import { RequirementsDetails } from '../../../interfaces/requirements-details';
import { DocumentationService } from '../../../services/documentation.service';

@Component({
  selector: 'app-created-docs',
  templateUrl: './created-docs.component.html',
  styleUrls: ['./created-docs.component.css']
})
export class CreatedDocsComponent implements OnInit {

  createdDocsPC:InitiationDetails[] = [];
  createdDocsSRS:RequirementsDetails[] = [];
  
  constructor(private _DocumentationService:DocumentationService) {

    this.createdDocsPC = _DocumentationService.ProjCharterGetter;
    this.createdDocsSRS = _DocumentationService.SRSGetter;

   }

  ngOnInit(): void {

    this._DocumentationService.sendPC.subscribe( (pc)=>{
      this.createdDocsPC = pc;
    } );
    this._DocumentationService.sendSRS.subscribe( (srs)=>{
      this.createdDocsSRS = srs;
    } );

  }

  /* ===========================================( Methods )=========================================== */

  viewProjectCharter(pcI:number)
  {
    this._DocumentationService.setPcDetailsVisible(pcI);
  }

  viewSRS(srsI:number)
  {
    this._DocumentationService.setSRSDetailsVisible(srsI);
  }

}
