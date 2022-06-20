import { Component, OnInit } from '@angular/core';
import { DocumentationService } from '../../../services/documentation.service';
import { FormGroup , FormControl , Validators, FormBuilder, FormArray } from '@angular/forms';
import { InitiationDetails } from 'src/app/interfaces/initiation-details';

@Component({
  selector: 'app-pc-form',
  templateUrl: './pc-form.component.html',
  styleUrls: ['./pc-form.component.css']
})
export class PcFormComponent implements OnInit {
  
  
  initiationForm:FormGroup;
  btnName:string = 'Save';
  // to put the right shape of the form
  isUpdate:boolean = false;

  constructor(private _DocumentationService:DocumentationService , private _formBuilder:FormBuilder) {
    
    this.initiationForm = this._formBuilder.group
    ({
      "title" : [null , Validators.required],
      "Date" : this._formBuilder.group
      ({
        "startDate" : [null , Validators.required],
        "endDate" : [null , Validators.required]
      }),
      "objectives" : [null , Validators.required],
      "manager" : [null , Validators.required],
      "information" : [null , Validators.required],
      "scopeStatement" : [null , Validators.required],
    });
    // to initialize form shape
    this.formInit();

  }

  // subscribe to service to control visibility
  ngOnInit(): void {

    this._DocumentationService.pcEdit.subscribe( (currentProjectCharter)=>{

      this.initiationForm.patchValue({
        "title" : currentProjectCharter.title,
        "Date" : ({
          "startDate" : currentProjectCharter.startDate,
          "endDate" : currentProjectCharter.endDate
        }),
        "objectives" : currentProjectCharter.objectives,
        "manager" : currentProjectCharter.manager,
        "information" : currentProjectCharter.information,
        "scopeStatement" : currentProjectCharter.scope,
      });

    });

    this._DocumentationService.isUpdateSend.subscribe( (isUpdate)=>{
      this.isUpdate = isUpdate;
      this.formInit();
    } );

  }


  /* ===========================================( compare start date with end date )=========================================== */
 
  
  dateError:any={isError:false,errorMessage:''};
  compareTwoDates(){
     if(new Date(this.initiationForm.controls['Date'].get("endDate")?.value)<new Date(this.initiationForm.controls['Date'].get("startDate")?.value)){
        this.dateError={isError:true,errorMessage:'End Date cant before start date'};
     }
     else
     {
       this.dateError={isError:false,errorMessage:''};
     }
  }

  /* ===========================================( Saving Content )=========================================== */
 
  saveCont()
  {
    let projectTitle = this.initiationForm.get('title')?.value;
    let projectStartDate = this.initiationForm.get('Date.startDate')?.value;
    let projectEndDate = this.initiationForm.get('Date.endDate')?.value;
    let projectObjectives = this.initiationForm.get('objectives')?.value;
    let projectManager = this.initiationForm.get('manager')?.value;
    let projectInformation = this.initiationForm.get('information')?.value;
    let projectScope = this.initiationForm.get('scopeStatement')?.value;

    if(this.btnName == 'Save')
    {
      this._DocumentationService.addProjectCharter("Initiation" ,projectTitle ,projectStartDate ,projectEndDate ,projectObjectives ,projectManager ,projectInformation ,projectScope );
      this.initiationForm.reset();
    }
    else if(this.btnName == 'Update Changes')
    {
      this._DocumentationService.updatePCDoc("Initiation" ,projectTitle ,projectStartDate ,projectEndDate ,projectObjectives ,projectManager ,projectInformation ,projectScope );
      this.initiationForm.reset();
      this.btnName = 'Save';
    }
    
  }


  /* ===========================================( Initialization )=========================================== */


  formInit()
  {
    if(this._DocumentationService.currentProjCharterGetter!=null && this._DocumentationService.isUpdate)
    {
      let currentPC = this._DocumentationService.currentProjCharterGetter;
      this.initiationForm.patchValue({
        "title" : currentPC.title,
        "Date" : ({
          "startDate" : currentPC.startDate,
          "endDate" : currentPC.endDate
        }),
        "objectives" : currentPC.objectives,
        "manager" : currentPC.manager,
        "information" : currentPC.information,
        "scopeStatement" : currentPC.scope,
      });
      this.btnName = 'Update Changes'
    }
    else
    {
      this.initiationForm.reset();
      this.btnName = 'Save'
    }
    
  }


}
