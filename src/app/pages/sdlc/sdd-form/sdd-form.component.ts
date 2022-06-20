import { Component, OnInit } from '@angular/core';
import { DocumentationService } from '../../../services/documentation.service';
import { FormGroup , FormControl , Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-sdd-form',
  templateUrl: './sdd-form.component.html',
  styleUrls: ['./sdd-form.component.css']
})
export class SddFormComponent implements OnInit {

  // Reactive Forms
  designForm:FormGroup;
  visibleForm:boolean = false;


  constructor(private _DocumentationService:DocumentationService , private _formBuilder:FormBuilder) {
    
    this.designForm = this._formBuilder.group(
      {
        AllDocs:this._formBuilder.array([this.createDiagram()],Validators.required)
      });

  }


  // subscribe to service to control visibility
  ngOnInit(): void {

    this._DocumentationService.selectedForm.subscribe( (form)=>{
      if(form == "sdd")
      {
        this.visibleForm = true;
      }
      else
      {
        this.visibleForm = false;
      }
    } );

  }

  /* ===========================================( Close form )=========================================== */

  closeForm()
  {
    this._DocumentationService.closeAnyForm();
  }

  /* ===========================================( Saving Content )=========================================== */
 
  saveCont()
  {
    
    for(let i=0 ; i<this.AllDocs.length ; i++)
    {
      this._DocumentationService.addSDD("Design" , this.AllDocs.controls[i].get('fileName')?.value , this.AllDocs.controls[i].get('fileSrc')?.value);
    }
    
    this.resetDesign();
  }

  /* ===========================================( Reset SDD form after saving )=========================================== */
 
  resetDesign()
  {
    // this.designForm.reset();
    while (this.AllDocs.length !== 0) {
      this.AllDocs.removeAt(0)
    }
    this.addDiagram();
  }

  /* ===========================================( Dynamic Form Methods )=========================================== */

  createDiagram():FormGroup{
    return this._formBuilder.group({
      fileName:[null,Validators.required],
      fileSrc:[null,Validators.required]
    })
  }
  
  get AllDocs():FormArray
  {
    return <FormArray>this.designForm?.get('AllDocs');
  }

  addDiagram() {
    this.AllDocs.push(this.createDiagram());
  }

  /* ===========================================( to catch Images )=========================================== */

  readSDDSrc(files:any , sddID:number) {

    const file = <File>files[0];
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent) => 
    {
      let imgSrc = reader.result ;
      (<FormArray>this.designForm?.get('AllDocs')).at(sddID).get("fileSrc")?.patchValue(imgSrc);
    }
    reader.readAsDataURL(file);
  }

  /* ===========================================( to remove object )=========================================== */

  removeObject(sddIndex:number)
  {
    this.AllDocs.controls.splice(sddIndex , 1);
  }

  /* ===========================================( to check if form is empty to disable submit btn )=========================================== */

  checkEmptyForm() : boolean
  {
    for(let i=0 ; i<this.AllDocs.length ; i++)
    {
      if(this.AllDocs.controls[i].invalid)
      {
        return true;
      }
    }
    return false;
  }


}
