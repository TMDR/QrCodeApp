import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { LoginComponent } from '../login/login.component';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AppModule } from '../app.module';
import { AppComponent } from '../app.component';
import { isUndefined } from 'util';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit {

  private readonly notifier: NotifierService;


  location: Location;

  static code : String = "";
  code : String;

  generateNow = false;

  ScheduleList = [];


  constructor(private apiCaller: HttpClient,notifierService: NotifierService, locationn: Location) {
    this.notifier = notifierService;
    this.location = locationn;
  }

  ngOnInit() {
  
    this.notifier.notify("success", "Welcome Professor " + LoginComponent.Professor.First_Name + " " + LoginComponent.Professor.Last_Name + "!");


    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    this.apiCaller.post
      (
        AppComponent.WEBAPIURL + '/QRcode/getSchedulesProf',
        { "idProfessor" : LoginComponent.Professor.idProfessor },
        options
      )
      .subscribe(response => {
        var json = JSON.parse(JSON.stringify(response));
        if (json["error"] == "password not correct" || json["error"] == "username not found") {
          this.notifier.notify("error", json["error"]);
          return;
        }
        this.ScheduleList = json;
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

  generate(value : string){
    var chosen = this.ScheduleList[value];
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    this.apiCaller.post
      (
        AppComponent.WEBAPIURL + '/QRcode/GenerateQRString',
        { "idClass" :  chosen.idClass,
          "idCourse" : chosen.idCourse,
          "idProfessor" : LoginComponent.Professor.idProfessor,
          "Day" : chosen.day,
          "Time" : chosen.time
        },
        options
      ).subscribe(response => {
        ProfessorComponent.code = response["str"];
        this.code = response["str"];
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
      this.generateNow = true;
  }
}
