import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { isUndefined } from 'util';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
 @Input() temp:number;
  idperson: number;
  username: any;
  password: any;
  selectType:any;
  type: number;
  firstname: any;
  lastname: any;
  email: any;
  mobile: any;
  level = [];
  idlevel: number;
  showStudent: boolean = false;
  showProfessor: boolean = false;
  address: any;
  firstnamep: any;
  lastnamep: any;
  emailp: any;
  mobilep: any;

  private readonly notifier: NotifierService;

  constructor(private apiCaller: HttpClient, public datepipe: DatePipe,notifierService: NotifierService) { this.notifier = notifierService;}
  ngOnInit() {
    this.getLevels();
  }

  addPerson() {
    if(this.selectType=='Professor'){
      this.type=1;
      this.showProfessor=true;
      this.showStudent = false;
    }
    else{
      this.type=0;
      this.showStudent=true;
      this.showProfessor = false;
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };
    this.apiCaller.post
      (
        AppComponent.WEBAPIURL + '/QRcode/AddPerson',
        { 'IdPerson': this.idperson, 'UserName': this.username, 'Password': this.password, 'Type': this.type },
        options
      ).subscribe(respone =>{},error =>{
        if(isUndefined(error["error"]["results"])){
          this.notifier.notify("error","The Server Is Down");
        }else{
          this.notifier.notify("error",error["error"]["results"]);
        }
      })
    this.temp=this.idperson;
    this.idperson =null;
    this.username = "";
    this.password = "";
    this.type = null;
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
  
  addProfessor() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };
    this.apiCaller.post
      (
        AppComponent.WEBAPIURL + '/QRcode/AddProfessor',
        {
          'IdProfessor': this.temp, 'FirstName': this.firstnamep, 'LastName': this.lastnamep, 'Email': this.emailp,
          'Mobile': this.mobilep, 'Address': this.address
        },
        options
      ).subscribe(respone =>{},error =>{
        if(isUndefined(error["error"]["results"])){
          this.notifier.notify("error","The Server Is Down");
        }else{
          this.notifier.notify("error",error["error"]["results"]);
        }
      })
    this.temp = null;
    this.firstnamep = "";
    this.lastnamep = "";
    this.emailp = "";
    this.mobilep = "";
    this.address = null;
    this.showProfessor=false;
  }
  addStudent() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };
    this.apiCaller.post
      (
        AppComponent.WEBAPIURL + '/QRcode/AddStudent',
        {
          'IdStudent': this.temp, 'FirstName': this.firstname, 'LastName': this.lastname, 'Email': this.email,
          'Mobile': this.mobile, 'idLevel': this.idlevel
        },
        options
      ).subscribe(respone =>{},error =>{
        if(isUndefined(error["error"]["results"])){
          this.notifier.notify("error","The Server Is Down");
        }else{
          this.notifier.notify("error",error["error"]["results"]);
        }
      })
    this.temp = null;
    this.firstname = "";
    this.lastname = "";
    this.email = "";
    this.mobile = "";
    this.idlevel = null;
    this.showStudent=false;
    this.temp=null;
  }
}
