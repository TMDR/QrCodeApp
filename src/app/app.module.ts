import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotifierModule, NotifierOptions } from "angular-notifier";
import { ProfessorComponent } from './professor/professor.component';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { AdminComponent } from './admin/admin.component';
import { QRCodeModule } from 'angularx-qrcode';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainroutingPROFComponent } from './mainrouting-prof/mainrouting-prof.component';
import { ProfAddGradesComponent } from './prof-add-grades/prof-add-grades.component';
import { GenerateEXCELComponent } from './generate-excel/generate-excel.component';
import { DatePipe } from '@angular/common';
import { MainroutingStudentComponent } from './mainrouting-student/mainrouting-student.component';
import { StdntScheduleComponent } from './stdnt-schedule/stdnt-schedule.component';
import { StdntGradesComponent } from './stdnt-grades/stdnt-grades.component';
import { MainroutingAdminComponent } from './mainrouting-admin/mainrouting-admin.component';
import { StdntRegisterComponent } from './stdnt-register/stdnt-register.component';
import { ProfRegisterComponent } from './prof-register/prof-register.component';
import { StdntEnrollComponent } from './stdnt-enroll/stdnt-enroll.component';
import { ProfInstructCourseComponent } from './prof-instruct-course/prof-instruct-course.component';
import { AddSchedulesComponent } from './add-schedules/add-schedules.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { AddClassComponent } from './add-class/add-class.component';
import { PersonComponent } from './person/person.component';
import { LevelComponent } from './level/level.component';
import { StudentGuardService } from './student-guard.service';
import { ProfessorGuardService } from './professor-guard.service';
import { AdminGuardService } from './admin-guard.service';
import { JwtModule } from '@auth0/angular-jwt';
 // sets up routes constant where you define your routes


 const appRoutes: Routes = [
  { path: 'login', 
    component: LoginComponent ,
    pathMatch: 'full' 
  },
  {
    path: 'professor',
    component: ProfessorComponent,
    pathMatch: 'full' ,
    canActivate: [ProfessorGuardService] 
  },
  {
    path: 'student',
    component: StudentComponent ,
    pathMatch: 'full' ,
    canActivate: [StudentGuardService] 
  },
  {
    path: 'admin',
    component: AdminComponent ,
    pathMatch: 'full' ,
    canActivate: [AdminGuardService] 
  },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full' ,
  },
  { path: '**',
    component:PageNotFoundComponent
  }
];


const customNotifierOptions: NotifierOptions = {
  position: {
      horizontal: {
          position: 'middle',
          // distance: 12
      },
      vertical: {
          position: 'bottom',
          // distance: 12,
          // gap: 10
      }
  },
  theme: 'material',
  behaviour: {
      autoHide: 5000,
      onClick: false,
      onMouseover: 'pauseAutoHide',
      showDismissButton: true,
      stacking: 4
  },
  animations: {
      enabled: true,
      show: {
          preset: 'slide',
          speed: 300,
          easing: 'ease'
      },
      hide: {
          preset: 'fade',
          speed: 300,
          easing: 'ease',
          offset: 50
      },
      shift: {
          speed: 300,
          easing: 'ease'
      },
      overlap: 150
  }
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfessorComponent,
    StudentComponent,
    AdminComponent,
    PageNotFoundComponent,
    MainroutingPROFComponent,
    ProfAddGradesComponent,
    GenerateEXCELComponent,
    MainroutingStudentComponent,
    StdntScheduleComponent,
    StdntGradesComponent,
    MainroutingAdminComponent,
    StdntRegisterComponent,
    ProfRegisterComponent,
    StdntEnrollComponent,
    ProfInstructCourseComponent,
    AddSchedulesComponent,
    AddCourseComponent,
    AddClassComponent,
    PersonComponent,
    LevelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotifierModule,
    RouterModule.forRoot(appRoutes),
    QRCodeModule,		
    CommonModule,
		HttpClientModule,
		FormsModule,
    ReactiveFormsModule,		
		ZXingScannerModule,
    NotifierModule.withConfig(customNotifierOptions),
    JwtModule.forRoot({
      config:{
        tokenGetter:(AppModule.getterToken),
        allowedDomains: ['*'],
        disallowedRoutes:[]
      }
    })
  ],
  exports: [RouterModule],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})

export class AppModule { 
  public static getterToken(){
    return localStorage.getItem('token');
  }
}


