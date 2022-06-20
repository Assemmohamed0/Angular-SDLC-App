import { Component, OnInit } from '@angular/core';
import { DocumentationService } from '../../../services/documentation.service';


@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.css']
})
export class DocumentDetailsComponent implements OnInit {


  constructor(private _DocumentationService:DocumentationService) { }

  ngOnInit(): void {
    
  }

  
}
