import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  static WEBAPIURL ="https://77cf64eabdcf.ngrok.io";
  constructor() { }

  ngOnInit(): void {
  }

  title = 'QRcodeApp';
}
