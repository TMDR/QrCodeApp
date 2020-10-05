import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { AppComponent } from '../app.component';
import { LoginComponent } from '../login/login.component';
import { Attendance } from '../attendance'
import { isUndefined } from 'util';

@Component({
  selector: 'app-stdnt-grades',
  templateUrl: './stdnt-grades.component.html',
  styleUrls: ['./stdnt-grades.component.css']
})

export class StdntGradesComponent implements OnInit {

  private notifier;

  responeS:Attendance[] = [];

  responseA = [];

  constructor(private apiCaller: HttpClient,notifierService: NotifierService) {
    this.notifier = notifierService;
   }

  ngOnInit() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    this.apiCaller.post
      (
        AppComponent.WEBAPIURL + '/QRcode/getStudentSessions',
        { 
          "idStudent" : LoginComponent.Student.idStudent
        },
        options
      )
      .subscribe(response => {
        var json = JSON.parse(JSON.stringify(response));
        this.responseA = json;
        this.responseA.forEach(element => {
          var oneEl:Attendance = new Attendance();
          oneEl.Email = element.email;
          oneEl.FirstName = element.firstName;
          oneEl.Grade = element.grade;
          oneEl.IdClass = element.idClass;
          oneEl.IdCourse = element.idCourse;
          oneEl.LastName = element.lastName;
          oneEl.Mobile = element.mobile;
          oneEl.day = element.date.split('T',2)[0];
          oneEl.time = element.date.split('T',2)[1];
          this.responeS.push(oneEl);
        });
      },error =>{
        if(isUndefined(error["error"]["results"])){
          this.notifier.notify("error","The Server Is Down");
        }else{
          this.notifier.notify("error",error["error"]["results"]);
        }
      }
      );
  }
}
