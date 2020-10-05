import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { isUndefined } from 'util';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit {
  year: number;
  department: any;
  
  private readonly notifier: NotifierService;

  constructor(private apiCaller: HttpClient, public datepipe: DatePipe,notifierService: NotifierService) { this.notifier = notifierService;}
  ngOnInit() {

  }

  addLevel() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };
    this.apiCaller.post
      (
        AppComponent.WEBAPIURL + '/QRcode/AddLevel',
        { 'year': this.year, 'department': this.department },
        options
      ).subscribe(respone =>{},error =>{
        if(isUndefined(error["error"]["results"])){
          this.notifier.notify("error","The Server Is Down");
        }else{
          this.notifier.notify("error",error["error"]["results"]);
        }
      })
    this.year =null;
    this.department = "";
   
  }
}