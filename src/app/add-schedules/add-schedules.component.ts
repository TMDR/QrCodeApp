import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { isUndefined } from 'util';
import { AppComponent } from '../app.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-add-schedules',
  templateUrl: './add-schedules.component.html',
  styleUrls: ['./add-schedules.component.css']
})
export class AddSchedulesComponent implements OnInit {
  idclass: any;
  coursename: any;
  time: any;
  day: any;
  idcourse: any;
  idlevel: number;
  level = [];
  courses = [];
  class=[];
  private readonly notifier: NotifierService;
  constructor(private apiCaller: HttpClient, public datepipe: DatePipe,notifierService: NotifierService) { this.notifier = notifierService;}
  ngOnInit() {
    this.getLevels();
    this.getCourses();
    this.getClass();
  }

  addSchedule() {
   const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };
    this.apiCaller.post
      (
        AppComponent.WEBAPIURL + '/QRcode/AddSchedule',
        {
          'idClass': this.idclass, 'Day': this.day, 'Time': this.time, 'idCourse': this.idcourse,
          'idLevel': this.idlevel
        },
        options
      ).subscribe(respone =>{},error =>{
        if(isUndefined(error["error"]["results"])){
          this.notifier.notify("error","The Server Is Down");
        }else{
          this.notifier.notify("error",error["error"]["results"]);
        }
      })
    this.idclass = "";
    this.idcourse = "";
    this.day = "";
    this.idlevel = null;
    this.coursename = "";
    this.time = "";

  }
  getLevels() {
    this.apiCaller.get(AppComponent.WEBAPIURL + '/QRcode/getLevels')
      .subscribe((data: any[]) => {
        this.level = data;
      },error =>{
        if(isUndefined(error["error"]["results"])){
          this.notifier.notify("error","The Server Is Down");
        }else{
          this.notifier.notify("error",error["error"]["results"]);
        }
      });
  }

  getCourses() {
    this.apiCaller.get(AppComponent.WEBAPIURL + '/QRcode/getCourses')
      .subscribe((data: any[]) => {
        this.courses = data;
      },error =>{
        if(isUndefined(error["error"]["results"])){
          this.notifier.notify("error","The Server Is Down");
        }else{
          this.notifier.notify("error",error["error"]["results"]);
        }
      });
  }
  getClass() {
    this.apiCaller.get(AppComponent.WEBAPIURL + '/QRcode/getClass')
      .subscribe((data: any[]) => {
        this.class = data;
      },error =>{
        if(isUndefined(error["error"]["results"])){
          this.notifier.notify("error","The Server Is Down");
        }else{
          this.notifier.notify("error",error["error"]["results"]);
        }
      });
  }
}