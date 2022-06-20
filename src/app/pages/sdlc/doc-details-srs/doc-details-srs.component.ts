import { Component, OnInit } from '@angular/core';
import { DocumentationService } from '../../../services/documentation.service';
import { RequirementsDetails } from '../../../interfaces/requirements-details';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-doc-details-srs',
  templateUrl: './doc-details-srs.component.html',
  styleUrls: ['./doc-details-srs.component.css']
})
export class DocDetailsSrsComponent implements OnInit {


  srsDocumentDetails:RequirementsDetails = {
    phase: '',
    introduction: '',
    purpose: '',
    intendedAudience: '',
    description: '',
    systemFeatures: '',
    useCaseSrc: ''
  };

  id:number = 0;

  constructor(private _DocumentationService:DocumentationService , private activeRoute: ActivatedRoute , private router:Router) {
    
    this.activeRoute.params.subscribe( (newParams)=> {
      this.id = newParams['id'];
      this.srsDocumentDetails = _DocumentationService.SRSGetter[this.id];
    })
   }

  ngOnInit(): void {

    this.activeRoute.params.subscribe( (newParams)=> {
      this.id = newParams['id'];
    })


    this._DocumentationService.srsDetailsSend.subscribe( (srsObj)=>{
      this.srsDocumentDetails = srsObj;
    } );

  }

  /* ===========================================( Methods )=========================================== */

  editSRS()
  {
    this._DocumentationService.editSRS(this.id);
    this.router.navigate(['/', 'sdlc', 'forms', 'srsForm']);
    this._DocumentationService.chekIfUpdate(true);
  }
  deleteSRS()
  {
    this._DocumentationService.deleteSRS(this.id);
    this.router.navigate(['/', 'sdlc', 'details']);
  }

}
