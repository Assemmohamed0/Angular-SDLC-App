import { Component, OnInit } from '@angular/core';
import { DocumentationService } from '../../services/documentation.service'

@Component({
  selector: 'app-sdlc',
  templateUrl: './sdlc.component.html',
  styleUrls: ['./sdlc.component.css']
})
export class SdlcComponent implements OnInit {

  constructor(private _DocumentationService:DocumentationService) { }

  ngOnInit(): void {
  }

  /* ===========================================( Methods )=========================================== */

  showPhases()
  {
    this._DocumentationService.setPhasesVisible(true);
  }
}
