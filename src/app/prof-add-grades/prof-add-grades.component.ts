import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { isUndefined } from 'util';
import { AppComponent } from '../app.component';
import { LoginComponent } from '../login/login.component';
import { ProfessorComponent } from '../professor/professor.component';

@Component({
  selector: 'app-prof-add-grades',
  templateUrl: './prof-add-grades.component.html',
  styleUrls: ['./prof-add-grades.component.css']
})
export class ProfAddGradesComponent implements OnInit {

  StudentList = [];

  action = AppComponent.WEBAPIURL + '/QRcode/AddGrades';
  private readonly notifier: NotifierService;

  constructor(private apiCaller: HttpClient,notifierService: NotifierService) { this.notifier = notifierService;}

  ngOnInit() {
    if(ProfessorComponent.code != ""){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      const options = { headers: headers };
  
      this.apiCaller.post
        (
          AppComponent.WEBAPIURL + '/QRcode/getStudentsInSession',
          { "str" : ProfessorComponent.code},
          options
        ).subscribe(response => {
          var json = JSON.parse(JSON.stringify(response));
          this.StudentList = json;
        },
          error => {
              if(isUndefined(error["error"]["results"])){
                this.notifier.notify("error","The Server Is Down");
              }else{
                this.notifier.notify("error",error["error"]["results"]);
              }
            return console.log(error);
          }
        );
    }
  }

  SaveChanges(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    this.apiCaller.post
      (
        AppComponent.WEBAPIURL + '/QRcode/AddStudentGrades',
        { "listStA" : this.StudentList},
        options
      ).subscribe(response => {
        this.notifier.notify("success","Grades Successfully Saved");
      },
        error => {
          if(isUndefined(error["error"]["results"])){
            this.notifier.notify("error","The Server Is Down");
          }else{
            this.notifier.notify("error",error["error"]["results"]);
          }
          return console.log(error);
        }
      );
  }

}
