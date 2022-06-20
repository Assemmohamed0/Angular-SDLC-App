import { Component, OnInit } from '@angular/core';
import { DocumentationService } from '../../../services/documentation.service';
import { InitiationDetails } from '../../../interfaces/initiation-details';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-doc-details-pc',
  templateUrl: './doc-details-pc.component.html',
  styleUrls: ['./doc-details-pc.component.css']
})
export class DocDetailsPcComponent implements OnInit {


  pcDocumentDetails:InitiationDetails = {
    phase: '',
    title: '',
    startDate: '',
    endDate: '',
    objectives: '',
    manager: '',
    information: '',
    scope: ''
  };

  id:number = 0;

  constructor(private _DocumentationService:DocumentationService , private activeRoute: ActivatedRoute , private router:Router) {
    this.activeRoute.params.subscribe( (newParams)=> {
      this.id = newParams['id'];
      this.pcDocumentDetails = _DocumentationService.ProjCharterGetter[this.id];
    })
   }

  ngOnInit(): void {

    this._DocumentationService.pcDetailsSend.subscribe( (pcObj)=>{
      this.pcDocumentDetails = pcObj;
    } );
    
  }

  /* ===========================================( Methods )=========================================== */

  editProjectCharter()
  {
    this.router.navigate(['/', 'sdlc', 'forms', 'pcForm']);
    this._DocumentationService.editProjectCharter(this.id);
    this._DocumentationService.chekIfUpdate(true);
  }
  
  deleteProjectCharter()
  {
    this.router.navigate(['/', 'sdlc', 'details']);
    this._DocumentationService.deleteProjectCharter(this.id);
  }


}
