import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { NotifierService } from 'angular-notifier';
import { LoginComponent } from '../login/login.component';
import { isUndefined } from 'util';

@Component({
  selector: 'app-stdnt-schedule',
  templateUrl: './stdnt-schedule.component.html',
  styleUrls: ['./stdnt-schedule.component.css']
})
export class StdntScheduleComponent implements OnInit {

  private readonly notifier:NotifierService;

  sechedules = [];

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
        AppComponent.WEBAPIURL + '/QRcode/getSchedule',
        { 
          "idStudent" : LoginComponent.Student.idStudent
        },
        options
      )
      .subscribe(response => {
        var json = JSON.parse(JSON.stringify(response));
        this.sechedules = json;
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
