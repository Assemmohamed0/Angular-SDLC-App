import { Component, OnInit } from '@angular/core';
import { DocumentationService } from '../../../services/documentation.service'

@Component({
  selector: 'app-sdlc-phases',
  templateUrl: './sdlc-phases.component.html',
  styleUrls: ['./sdlc-phases.component.css']
})
export class SdlcPhasesComponent implements OnInit {

  isVisible:boolean = false;

  constructor(private _DocumentationService:DocumentationService) {}
  
  ngOnInit(): void {
    this._DocumentationService.phasesSend.subscribe( (isVisible)=>{
      this.isVisible = isVisible;
    });
  }

  /* ===========================================( Methods )=========================================== */

  removeUpdate()
  {
    this._DocumentationService.chekIfUpdate(false);
  }

}
