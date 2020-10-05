import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { isUndefined } from 'util';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  idcourse: any;
  coursename: any;
  creditsnb: number;
  duration: number;
  private readonly notifier: NotifierService;
  constructor(private apiCaller: HttpClient, public datepipe: DatePipe,notifierService: NotifierService) { this.notifier = notifierService;}
  ngOnInit() {

  }

  addCourse() {
 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };
    this.apiCaller.post
      (
        AppComponent.WEBAPIURL + '/QRcode/AddCourse',
        { 'IdCourse': this.idcourse, 'Name': this.coursename, 'Credits': this.creditsnb, 'TotalDuration': this.duration },
        options
      ).subscribe(respone =>{},error =>{
        if(isUndefined(error["error"]["results"])){
          this.notifier.notify("error","The Server Is Down");
        }else{
          this.notifier.notify("error",error["error"]["results"]);
        }
      });
    this.idcourse = "";
    this.coursename = "";
    this.creditsnb = null;
    this.duration = null;
  }
}