import { Component, OnInit } from '@angular/core';
import { DocumentationService } from '../../../services/documentation.service';
import { FormGroup , FormControl , Validators, FormBuilder, FormArray } from '@angular/forms'


@Component({
  selector: 'app-srs-form',
  templateUrl: './srs-form.component.html',
  styleUrls: ['./srs-form.component.css']
})
export class SrsFormComponent implements OnInit {

  requirementsForm:FormGroup;
  btnName:string = 'Save';
  // to put the right shape of the form
  isUpdate:boolean = false;

  constructor(private _DocumentationService:DocumentationService , private _formBuilder:FormBuilder) {
    
    this.requirementsForm = this._formBuilder.group
    ({
      "introduction" : [null , Validators.required],
      "purpose" : [null , Validators.required],
      "intendedAudience" : [null , Validators.required],
      "description" : [null , Validators.required],
      "systemFeatures" : [null , Validators.required],
      "useCaseSrc" : [null , Validators.required],
    })
    this.formInit();

  }

 
  ngOnInit(): void {

    this._DocumentationService.srsEdit.subscribe( (currentSRS)=>{
      this.requirementsForm.patchValue({
        "introduction" : currentSRS.introduction,
        "purpose" : currentSRS.purpose,
        "intendedAudience" : currentSRS.intendedAudience,
        "description" : currentSRS.description,
        "systemFeatures" : currentSRS.systemFeatures,
        "useCaseSrc" : currentSRS.useCaseSrc
      });
      console.log(currentSRS.useCaseSrc);
    } );

    this._DocumentationService.isUpdateSend.subscribe( (isUpdate)=>{
      this.isUpdate = isUpdate;
      this.formInit();
    } );

  }
  

  /* ===========================================( Saving Content )=========================================== */
 
  saveCont()
  {
    let projectIntroduction = this.requirementsForm.get('introduction')?.value;
    let projectPurpose = this.requirementsForm.get('purpose')?.value;
    let projectIntended = this.requirementsForm.get('intendedAudience')?.value;
    let projectDescribtion = this.requirementsForm.get('description')?.value;
    let projectSysFeatures = this.requirementsForm.get('systemFeatures')?.value;
    let projectUseCaseSrc = this.requirementsForm.get('useCaseSrc')?.value;

    if(this.btnName == 'Save')
    {
      this._DocumentationService.addSRS("Requirements" ,projectIntroduction, projectPurpose ,projectIntended ,projectDescribtion ,projectSysFeatures ,projectUseCaseSrc);
    }
    else if(this.btnName == 'Update Changes')
    {
      this._DocumentationService.updateSRSDoc("Requirements" ,projectIntroduction, projectPurpose ,projectIntended ,projectDescribtion ,projectSysFeatures ,projectUseCaseSrc);
      this.btnName = 'Save';
    }

    this.requirementsForm.reset();
    (<HTMLInputElement>document.getElementById("useCaseInput")).value = "";
  }

  /* ===========================================( Catching Images )=========================================== */

  readSRSSrc(files:any) 
  {
    const file = <File>files[0];
    const reader = new FileReader();
    if (files && files.length > 0) {
      reader.onload = (event: ProgressEvent) => {
        let imgSrc = reader.result ;
        this.requirementsForm.get('useCaseSrc')?.patchValue(imgSrc);
        // console.log(this.requirementsForm.get('image')?.value);
      }
      reader.readAsDataURL(file);
    }
  }


 /* ===========================================( Initialization )=========================================== */


 formInit()
  {
    if(this._DocumentationService.currentSRSGetter!=null && this._DocumentationService.isUpdate)
    {
      let currentSRS = this._DocumentationService.currentSRSGetter;
      this.requirementsForm.patchValue({
        "introduction" : currentSRS.introduction,
        "purpose" : currentSRS.purpose,
        "intendedAudience" : currentSRS.intendedAudience,
        "description" : currentSRS.description,
        "systemFeatures" : currentSRS.systemFeatures,
        "useCaseSrc" : currentSRS.useCaseSrc
      });
      this.btnName = 'Update Changes'
    }
    else
    {
      this.requirementsForm.reset();
      this.btnName = 'Save'
    }
    
  }







}
