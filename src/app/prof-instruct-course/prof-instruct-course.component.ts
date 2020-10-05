import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { isUndefined } from 'util';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-prof-instruct-course',
  templateUrl: './prof-instruct-course.component.html',
  styleUrls: ['./prof-instruct-course.component.css']
})
export class ProfInstructCourseComponent implements OnInit {
  idprofessor:number;
  idcourse:any;
  courses = [];
  private readonly notifier: NotifierService;
  constructor(private apiCaller: HttpClient, public datepipe: DatePipe,notifierService: NotifierService) { this.notifier = notifierService;}

  ngOnInit() {
    this.getCourses();
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
  assignDoctor() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };
    this.apiCaller.post
      (
        AppComponent.WEBAPIURL + '/QRcode/DoctorInstruction',
        { 'IdProfessor': this.idprofessor, 'IdCourse':this.idcourse},
        options
      ).subscribe(respone =>{},error =>{
        if(isUndefined(error["error"]["results"])){
          this.notifier.notify("error","The Server Is Down");
        }else{
          this.notifier.notify("error",error["error"]["results"]);
        }
      })
        this.idcourse="";
        this.idprofessor=null;
        
  }
}
