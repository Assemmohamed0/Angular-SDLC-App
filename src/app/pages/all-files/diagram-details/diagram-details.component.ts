import { Component, OnInit } from '@angular/core';
import { DocumentationService } from '../../../services/documentation.service';

@Component({
  selector: 'app-diagram-details',
  templateUrl: './diagram-details.component.html',
  styleUrls: ['./diagram-details.component.css']
})
export class DiagramDetailsComponent implements OnInit {


  diagramSrc:string = '';
  diagramName:string = '';
  diagramPhase:string = '';
  visibleForm:boolean = false;


  constructor(private _DocumentationService:DocumentationService) { }

  ngOnInit(): void {

    this._DocumentationService.sddDiagramsSend.subscribe( (diagramDetails)=>{
      this.diagramName = diagramDetails.fileName,
      this.diagramPhase = diagramDetails.phase,
      this.diagramSrc = diagramDetails.diagramSrc
    } );

    this._DocumentationService.srsDiagramsSend.subscribe( (diagramDetailss)=>{
      this.diagramName = "Use Case",
      this.diagramPhase = diagramDetailss.phase,
      this.diagramSrc = diagramDetailss.useCaseSrc
    } );

    // set visibility
    this._DocumentationService.selectedForm.subscribe( (form)=>{
      if(form == "diagramDetails")
      {
        this.visibleForm = true;
      }
      else
      {
        this.visibleForm = false;
      }
    } );

  }

  /* ===========================================( Methods )=========================================== */

  closeForm()
  {
    this._DocumentationService.closeAnyForm();
  }


}
