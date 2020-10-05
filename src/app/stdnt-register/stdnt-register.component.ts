import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { isUndefined } from 'util';

import { AppComponent } from '../app.component';

@Component({
  selector: 'app-stdnt-register',
  templateUrl: './stdnt-register.component.html',
  styleUrls: ['./stdnt-register.component.css']
})
export class StdntRegisterComponent implements OnInit {

   students = [];
   private readonly notifier: NotifierService;
  constructor(private apiCaller: HttpClient, public datepipe: DatePipe,notifierService: NotifierService) { this.notifier = notifierService;}
  ngOnInit() {

    this.getStudents();
  }

  getStudents() {
    this.apiCaller.get(AppComponent.WEBAPIURL + '/QRcode/getStudents')
      .subscribe((data: any[]) => {
        this.students = data;
      },error =>{
        if(isUndefined(error["error"]["results"])){
          this.notifier.notify("error","The Server Is Down");
        }else{
          this.notifier.notify("error",error["error"]["results"]);
        }
      });
  }
}

