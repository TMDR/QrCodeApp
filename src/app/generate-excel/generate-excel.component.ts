
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { LoginComponent } from '../login/login.component';
import {  
  saveAs as importedSaveAs  
} from "file-saver";  
import { Observable } from 'rxjs';
import { isUndefined } from 'util';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-generate-excel',
  templateUrl: './generate-excel.component.html',
  styleUrls: ['./generate-excel.component.css']
})
export class GenerateEXCELComponent implements OnInit {
  date:any;
  prof=[];
  idCourse:any;
 
  private readonly notifier: NotifierService;

  static returnYes = false;

  constructor(private apiCaller: HttpClient,public datepipe: DatePipe,notifierService: NotifierService) { this.notifier = notifierService;}

  ngOnInit() {
    this.getProfCourse();
  }

  getProfCourse() {
    {

      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      const options = { headers: headers };

      this.apiCaller.post
        (
          AppComponent.WEBAPIURL + '/QRcode/getProfCourses',
          { 'IdProfessor': LoginComponent.Professor.idProfessor },
          options
        )
        .subscribe((data: any[]) => {
          this.prof = data;
        },error =>{
          if(isUndefined(error["error"]["results"])){
            this.notifier.notify("error","The Server Is Down");
          }else{
            this.notifier.notify("error",error["error"]["results"]);
          }
        })
    }

  }

public downloadFile(): Observable < Blob > { 
  let latest_date =this.datepipe.transform(this.date, 'dd/MM/yyyy') 
  return this.apiCaller.get(AppComponent.WEBAPIURL+'/QRcode/GenerateExcelFile?IdCourse=' + this.idCourse.toString()+'&date='+latest_date.toString()   , {  
    responseType: 'blob'
}
  );  
}  

  generateExcel(){
    let latest_date =this.datepipe.transform(this.date, 'dd/MM/yyyy') 
    this.apiCaller.get(AppComponent.WEBAPIURL+'/QRcode/GenerateExcelFile?IdCourse=' + this.idCourse.toString()+'&date='+latest_date.toString()).subscribe(
      (data) => {  
  },error =>{
    console.log(error);
    console.log(error["statusText"]);
    
    if(error["statusText"] != "OK"){
    if(isUndefined(error["error"]["results"])){
      this.notifier.notify("error","The Server Is Down");
    }else{
      this.notifier.notify("error",error["error"]["results"]);
    }
  }else{
    this.downloadFile().subscribe((data) => {  
      importedSaveAs(data, "result.zip");  
  },error =>{
    console.log(error);
    if(isUndefined(error["error"]["results"])){
      this.notifier.notify("error","The Server Is Down");
    }else{
      this.notifier.notify("error",error["error"]["results"]);
    }
  });  
  }
  });
  }
}