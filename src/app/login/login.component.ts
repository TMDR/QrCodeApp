import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthService } from '../auth.service';
import { isUndefined } from 'util';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  private readonly notifier: NotifierService;

  static Student={
    Email:"",
    First_Name:"",
    Last_Name:"",
    Mobile:"",
    idStudent:"",
    UserName:""
  };
  static Person={
    UserName:"",
    Password:"",
    idAdmin:""//if Admin
  }
  static Professor={
    Address:"",
    Email:"",
    First_Name:"",
    Last_Name:"",
    Mobile:"",
    idProfessor:"",
    UserName:""
  }
  constructor(private apiCaller: HttpClient,notifierService: NotifierService,private router: Router, private route: ActivatedRoute, private authenticationService: AuthService) { 
    this.notifier = notifierService;
  }

  ngOnInit() {
    
  }

  setUName(event: any){
    LoginComponent.Person.UserName = event.target.value;
  }  
  setPass(event: any){
    LoginComponent.Person.Password = event.target.value;
  }

  submit() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    this.apiCaller.post
      (
        AppComponent.WEBAPIURL + '/QRcode/LoginAuthentication',
        { "UserName": LoginComponent.Person.UserName, "Password": LoginComponent.Person.Password },
        options
      )     
      .subscribe(response => {
        var json = JSON.parse(JSON.stringify(response));
        console.log(json);  
        // console.log(json);//this for the test so we can see the values
        let type = json["type"];
        if(type == 1){//professor page
          console.log("professor :");
          LoginComponent.Professor.Address = json["address"];
          LoginComponent.Professor.Email = json["email"];
          LoginComponent.Professor.First_Name = json["firstName"];
          LoginComponent.Professor.Last_Name  = json["lastName"];
          LoginComponent.Professor.Mobile = json["mobile"];
          LoginComponent.Professor.idProfessor = json["idProfessor"];
          LoginComponent.Professor.UserName = LoginComponent.Person.UserName;
                    //remove the after if when returning to this page it reloads and all variables reset to empty
          LoginComponent.Person.Password = "";
          LoginComponent.Person.UserName = "";
          LoginComponent.Person.idAdmin = "";
          LoginComponent.Student.Email = "";
          LoginComponent.Student.First_Name = "";
          LoginComponent.Student.Last_Name = "";
          LoginComponent.Student.Mobile = "";
          LoginComponent.Student.UserName = "";
          LoginComponent.Student.idStudent = "";
          this.notifier.notify("success","redirecting "+LoginComponent.Professor.First_Name+" "+LoginComponent.Professor.Last_Name+" to his Professor page");
          this.authenticationService.loginSuccess(type);
          this.router.navigate([`../professor`], { relativeTo: this.route });
          // console.log(LoginComponent.Professor);//test to remove
        }else if(type == 2){//admin page
          console.log("admin :");
          LoginComponent.Person.UserName = json["userName"];
          console.log("UserName = ",LoginComponent.Person.UserName);
          LoginComponent.Person.Password = json["password"];
          console.log("Password = ",LoginComponent.Person.Password);
          LoginComponent.Person.idAdmin = json["idPerson"];
                    //remove the after if when returning to this page it reloads and all variables reset to empty
          LoginComponent.Professor.Address = "";
          LoginComponent.Professor.Email = "";
          LoginComponent.Professor.First_Name = "";
          LoginComponent.Professor.Last_Name = "";
          LoginComponent.Professor.Mobile = "";
          LoginComponent.Professor.UserName = "";
          LoginComponent.Professor.idProfessor = "";
          LoginComponent.Student.Email = "";
          LoginComponent.Student.First_Name = "";
          LoginComponent.Student.Last_Name = "";
          LoginComponent.Student.Mobile = "";
          LoginComponent.Student.UserName = "";
          LoginComponent.Student.idStudent = "";
          console.log("idAdmin = ",LoginComponent.Person.idAdmin);
          this.notifier.notify("success","redirecting to admin page");
          this.authenticationService.loginSuccess(type);
          this.router.navigate([`../admin`], { relativeTo: this.route });
          // console.log(LoginComponent.Person);//test to remove
        }else{//student page
          console.log("student :");
          LoginComponent.Student.Email = json["email"];
          LoginComponent.Student.First_Name = json["firstName"];
          LoginComponent.Student.Last_Name  = json["lastName"];
          LoginComponent.Student.Mobile = json["mobile"];
          LoginComponent.Student.idStudent = json["idStudent"];
          LoginComponent.Student.UserName = LoginComponent.Person.UserName;
                              //remove the after if when returning to this page it reloads and all variables reset to empty
          LoginComponent.Professor.Address = "";
          LoginComponent.Professor.Email = "";
          LoginComponent.Professor.First_Name = "";
          LoginComponent.Professor.Last_Name = "";
          LoginComponent.Professor.Mobile = "";
          LoginComponent.Professor.UserName = "";
          LoginComponent.Professor.idProfessor = "";
          LoginComponent.Person.Password = "";
          LoginComponent.Person.UserName = "";
          LoginComponent.Person.idAdmin = "";
          this.notifier.notify("success","redirecting "+LoginComponent.Student.First_Name+" "+LoginComponent.Student.Last_Name+" to his student page");
          this.authenticationService.loginSuccess(type);
          this.router.navigate([`../student`], { relativeTo: this.route });
        }
        return;
      },
       error => {
        if(isUndefined(error["error"]["results"])){
          this.notifier.notify("error","The Server Is Down");
        }else{
          this.notifier.notify("error",error["error"]["results"]);
        }
        }
      );

  }

}

