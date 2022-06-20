import { Injectable , EventEmitter } from '@angular/core';
import { InitiationDetails } from '../interfaces/initiation-details';
import { RequirementsDetails } from '../interfaces/requirements-details';
import { DesignDetails } from '../interfaces/design-details';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DocumentationService {

  // array of each phase
  projectCharter: InitiationDetails[] = [];
  SRS: RequirementsDetails[] = [];
  SDD: DesignDetails[] = [];

  // current Project Charter and SRS objects
  // currentProjectCharter:number = this.projectCharter.length;
  // currentSRS:number = this.SRS.length;

  constructor() { }

  // compare start date with end date
  public static dateRangeValidator(control : AbstractControl) : ValidationErrors | null
  {
    
    if (!control.get('startDate')?.value || !control.get('endDate')?.value)
      return null;

    if (!control.valid)
      return { invalidDateRange : true };

    // if its valid
    return null;
  }

  /* =============================================( storing phases details )============================================= */

  // storing project charter
  sendPC: EventEmitter<InitiationDetails[]> = new EventEmitter();
  addProjectCharter(phase:string, title:string, startDate:Date, endDate:Date, objectives:string, manager:string, information:string, scope:string)
  {
    
     this.projectCharter.push({
      phase : phase,
      title : title,
      startDate : startDate,
      endDate : endDate, 
      objectives : objectives, 
      manager : manager, 
      information : information, 
      scope : scope
    });
    this.sendPC.emit(this.projectCharter);
  }

  get ProjCharterGetter():InitiationDetails[]
  {
    return this.projectCharter;
  }

  // storing SRS
  sendSRS: EventEmitter<RequirementsDetails[]> = new EventEmitter();
  addSRS(phase:string, introduction : string, purpose : string, intendedAudience : string, description : string, systemFeatures : string, useCaseSrc : any)
  {
    this.SRS.push({
      phase:phase,
      introduction : introduction,
      purpose : purpose,
      intendedAudience : intendedAudience, 
      description : description, 
      systemFeatures : systemFeatures, 
      useCaseSrc : useCaseSrc
    });
    this.sendSRS.emit(this.SRS);
  }

  get SRSGetter():RequirementsDetails[]
  {
    return this.SRS;
  }
  
  // storing SDD
  sendSDD: EventEmitter<DesignDetails[]> = new EventEmitter();
  addSDD(phase:string, fileName:string, diagramSrc:any)
  {
    this.SDD.push({
      phase:phase,
      fileName:fileName,
      diagramSrc : diagramSrc
    })
    this.sendSDD.emit(this.SDD);
  }

  get SDDGetter():DesignDetails[]
  {
    return this.SDD;
  }
  

  /* =============================================( Edit Methods )============================================= */

  /* ==============================( 1.send changes )============================== */

  // send initiation phase changes to created docs
  editedPC: EventEmitter<InitiationDetails[]> = new EventEmitter();
  updatePCDoc(phase:string, title:string, startDate:Date, endDate:Date, objectives:string, manager:string, information:string, scope:string)
  {
    this.projectCharter[this.currentPc] = {
        phase : phase,
        title : title,
        startDate : startDate,
        endDate : endDate, 
        objectives : objectives, 
        manager : manager, 
        information : information, 
        scope : scope
      }
      this.editedPC.emit(this.projectCharter);
  }

  // send requirements phase changes to created docs
  editedSRS: EventEmitter<RequirementsDetails[]> = new EventEmitter();
  updateSRSDoc(phase:string, introduction : string, purpose : string, intendedAudience : string, description : string, systemFeatures : string, useCaseSrc : any)
  {
    this.SRS[this.currentSRS] = {
      phase:phase,
      introduction : introduction,
      purpose : purpose,
      intendedAudience : intendedAudience, 
      description : description, 
      systemFeatures : systemFeatures, 
      useCaseSrc : useCaseSrc
      }
      this.editedSRS.emit(this.SRS);
  }

  /* ==============================( 2.check if we clicked update btn  )============================== */
  
  isUpdate:boolean = false;
  isUpdateSend:EventEmitter<boolean> = new EventEmitter();
  chekIfUpdate(isUpdate:boolean)
  {
    this.isUpdate = isUpdate;
    this.isUpdateSend.emit(this.isUpdate);
  }

  /* ==============================( 3.send details to forms to get ready to update  )============================== */

  // edit project charter and update it
  currentPc:number = 0;
  pcEdit:EventEmitter<InitiationDetails> = new EventEmitter();
  editProjectCharter(pcId:number)
  {
    this.pcEdit.emit(this.projectCharter[pcId]);
    this.currentPc = pcId;
  }
  // to return current pc
  get currentProjCharterGetter():InitiationDetails
  {
    return this.projectCharter[this.currentPc];
  }


  // edit SRS and update it
  currentSRS:number = 0;
  srsEdit:EventEmitter<RequirementsDetails> = new EventEmitter();
  editSRS(srsId:number)
  {
    this.srsEdit.emit(this.SRS[srsId]);
    this.currentSRS = srsId;
  }
  // to return current srs
  get currentSRSGetter():RequirementsDetails
  {
    return this.SRS[this.currentSRS];
  }


  /* =============================================( show phases select box )============================================= */
  

  phasesVisible:boolean = false;
  phasesSend:EventEmitter<boolean> = new EventEmitter();
  setPhasesVisible(isVisible:boolean)
  {
    this.phasesVisible = isVisible;
    this.phasesSend.emit(this.phasesVisible);
  }


  /* =============================================( Delete Methods )============================================= */
  

  // delete project charter from created documents
  deleteProjectCharter(pcId:number)
  {
    this.projectCharter.splice(pcId,1);
    this.sendPC.emit(this.projectCharter);
  }

  // delete srs from created documents
  deleteSRS(srsId:number)
  {
    this.SRS.splice(srsId,1);
    this.sendSRS.emit(this.SRS);
  }


  /* =============================================( show document details )============================================= */
  

  // show project charter details
  pcDetailsSend:EventEmitter<InitiationDetails> = new EventEmitter();
  setPcDetailsVisible(pcDocId:number)
  {
    this.pcDetailsSend.emit(this.projectCharter[pcDocId]);
  }

  // show SRS details
  srsDetailsSend:EventEmitter<RequirementsDetails> = new EventEmitter();
  setSRSDetailsVisible(srsDocId:number)
  {
    this.srsDetailsSend.emit(this.SRS[srsDocId]);
  }

  // Show SDD Diagrams Details
  sddDiagramsSend:EventEmitter<DesignDetails> = new EventEmitter();
  setSDDDiagramsVisible(sddDocId:number)
  {
    this.chooseVisibleForm("diagramDetails");
    this.sddDiagramsSend.emit(this.SDD[sddDocId]);
  }

  // Show SRS Diagrams Details
  srsDiagramsSend:EventEmitter<RequirementsDetails> = new EventEmitter();
  setSRSDiagramsVisible(srsDocId:number)
  {
    this.chooseVisibleForm("diagramDetails");
    this.srsDiagramsSend.emit(this.SRS[srsDocId]);
  }

  
  /* =============================================( toggle between forms and close )============================================= */
  

  selectedForm:EventEmitter<string> = new EventEmitter();
  chooseVisibleForm(selectedForm:string)
  {
    this.selectedForm.emit(selectedForm);
  }

  closeAnyForm()
  {
    this.chooseVisibleForm("");
  }
  
 
  /* =============================================( End )============================================= */
  

}
