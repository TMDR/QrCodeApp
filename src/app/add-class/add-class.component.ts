import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { isUndefined } from 'util';
import { AppComponent } from '../app.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {
  idclass: any;
  classname: any;
  floornb:number;
  private readonly notifier: NotifierService;

  constructor(private apiCaller: HttpClient, public datepipe: DatePipe,notifierService: NotifierService) { this.notifier = notifierService;}
  ngOnInit() {
   
  }


  
  addClass() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };
    this.apiCaller.post
      (
        AppComponent.WEBAPIURL + '/QRcode/AddClass',
        { 'IdClass': this.idclass, 'Name':this.classname, 'Floor_Number':this.floornb},
        options
      ).subscribe(respone =>{},error =>{
        if(isUndefined(error["error"]["results"])){
          this.notifier.notify("error","The Server Is Down");
        }else{
          this.notifier.notify("error",error["error"]["results"]);
        }
      });
        this.idclass="";
        this.classname="";
        this.floornb=null;
  }
}