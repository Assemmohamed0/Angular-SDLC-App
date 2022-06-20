import { Component, OnInit } from '@angular/core';
import { DesignDetails } from '../../../interfaces/design-details';
import { DocumentationService } from '../../../services/documentation.service';
import { RequirementsDetails } from '../../../interfaces/requirements-details';

@Component({
  selector: 'app-created-diagrams',
  templateUrl: './created-diagrams.component.html',
  styleUrls: ['./created-diagrams.component.css']
})
export class CreatedDiagramsComponent implements OnInit {

  createdDiagramsSDD:DesignDetails[] = [];
  createdDiagramsSRS:RequirementsDetails[] = [];

  constructor(private _DocumentationService:DocumentationService) {

    this.createdDiagramsSDD = _DocumentationService.SDDGetter;
    this.createdDiagramsSRS = _DocumentationService.SRSGetter;
    
  }

  ngOnInit(): void {

    this._DocumentationService.sendSDD.subscribe( (sdd)=>{
      this.createdDiagramsSDD = sdd;
    } );
    this._DocumentationService.sendSRS.subscribe( (srs)=>{
      this.createdDiagramsSRS = srs;
    } );

  }

  /* ===========================================( Methods )=========================================== */
  
  viewSDD(sddI:number)
  {
    this._DocumentationService.setSDDDiagramsVisible(sddI);
  }
  viewSRS(srsI:number)
  {
    this._DocumentationService.setSRSDiagramsVisible(srsI);
  }


}
