import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { LoginComponent } from '../login/login.component';
import {Location} from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private readonly notifier: NotifierService;

  location:Location;

  constructor(notifierService: NotifierService,private locationn: Location) {
    this.notifier = notifierService;
    this.location = locationn;
  }

  ngOnInit() {
    this.notifier.notify("success","Welcome "+LoginComponent.Person.UserName+"!");
  }
}
