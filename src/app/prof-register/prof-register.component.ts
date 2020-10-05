import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { isUndefined } from 'util';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-prof-register',
  templateUrl: './prof-register.component.html',
  styleUrls: ['./prof-register.component.css']
})
export class ProfRegisterComponent implements OnInit {

  professor = [];
  
  private readonly notifier: NotifierService;
  
  constructor(private apiCaller: HttpClient, public datepipe: DatePipe,notifierService: NotifierService) { this.notifier = notifierService;}
  ngOnInit() {
    this.getProfessor();
  }
  getProfessor() {
    this.apiCaller.get(AppComponent.WEBAPIURL + '/QRcode/getProfessors')
      .subscribe((data: any[]) => {
        this.professor = data;
      },error =>{
        if(isUndefined(error["error"]["results"])){
          this.notifier.notify("error","The Server Is Down");
        }else{
          this.notifier.notify("error",error["error"]["results"]);
        }
      });
  }
}
