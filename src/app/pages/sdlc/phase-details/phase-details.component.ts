import { Component, OnInit } from '@angular/core';
import { DocumentationService } from '../../../services/documentation.service';

@Component({
  selector: 'app-phase-details',
  templateUrl: './phase-details.component.html',
  styleUrls: ['./phase-details.component.css']
})
export class PhaseDetailsComponent implements OnInit {

  constructor(private _DocumentationService:DocumentationService) {}

  ngOnInit(): void {

  }

}
