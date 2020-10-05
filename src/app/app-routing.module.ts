import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddClassComponent } from './add-class/add-class.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { AddSchedulesComponent } from './add-schedules/add-schedules.component';
import { AdminGuardService } from './admin-guard.service';
import { GenerateEXCELComponent } from './generate-excel/generate-excel.component';
import { LevelComponent } from './level/level.component';
import { PersonComponent } from './person/person.component';
import { ProfAddGradesComponent } from './prof-add-grades/prof-add-grades.component';
import { ProfInstructCourseComponent } from './prof-instruct-course/prof-instruct-course.component';
import { ProfRegisterComponent } from './prof-register/prof-register.component';
import { ProfessorGuardService } from './professor-guard.service';
import { StdntEnrollComponent } from './stdnt-enroll/stdnt-enroll.component';
import { StdntGradesComponent } from './stdnt-grades/stdnt-grades.component';
import { StdntRegisterComponent } from './stdnt-register/stdnt-register.component';
import { StdntScheduleComponent } from './stdnt-schedule/stdnt-schedule.component';
import { StudentGuardService } from './student-guard.service';




const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path:'addGrades', component: ProfAddGradesComponent ,  canActivate: [ProfessorGuardService]  },
  { path:'generateEXCEL', component: GenerateEXCELComponent  ,  canActivate: [ProfessorGuardService]  },
  { path:'StdntSchedule', component:StdntScheduleComponent  ,  canActivate: [StudentGuardService]  },
  { path:'StdntGrades', component:StdntGradesComponent ,  canActivate: [StudentGuardService]  },
  { path:'RegisterStdnt',component:StdntRegisterComponent ,  canActivate: [AdminGuardService]  },
  { path:'RegisterProf',component:ProfRegisterComponent ,  canActivate: [AdminGuardService] },
  { path:'EnrollStdnt',component:StdntEnrollComponent ,  canActivate: [AdminGuardService] },
  { path:'ProfInstructCourse',component:ProfInstructCourseComponent ,  canActivate: [AdminGuardService] },
  { path:'AddSchedules',component:AddSchedulesComponent ,  canActivate: [AdminGuardService] },
  { path:'AddCourse',component:AddCourseComponent ,  canActivate: [AdminGuardService] },
  { path:'AddClass',component:AddClassComponent ,  canActivate: [AdminGuardService] },
  { path:'AddPerson',component:PersonComponent ,  canActivate: [AdminGuardService] },
  { path:'AddLevel',component:LevelComponent ,  canActivate: [AdminGuardService] }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
