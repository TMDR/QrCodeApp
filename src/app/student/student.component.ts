import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { LoginComponent } from '../login/login.component';
import {Location} from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { isUndefined } from 'util';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  private readonly notifier: NotifierService;


  location:Location;

  scanned=true;

  constructor(private apiCaller: HttpClient,notifierService: NotifierService,private locationn:Location) {
    this.notifier = notifierService;
    this.location = locationn;
  }

  ngOnInit() {
 
    this.notifier.notify("success","Welcome Student "+LoginComponent.Student.First_Name+" "+LoginComponent.Student.Last_Name+"!");
  }
  result: any;

  public scanSuccessHandler($event: any) {
    this.result = $event;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    this.apiCaller.post
      (
        AppComponent.WEBAPIURL + '/QRcode/TakeAttendance',
        { "QRCode" : this.result ,
          "IdStudent" : LoginComponent.Student.idStudent
        },
        options
      )
      .subscribe(response => {
        this.notifier.notify("success","Attendance Taken");
      },error =>{
        if(isUndefined(error["error"]["results"])){
          this.notifier.notify("error","The Server Is Down");
        }else{
          this.notifier.notify("error",error["error"]["results"]);
        }
      }
      );
      this.scanned = false;
  }
}
