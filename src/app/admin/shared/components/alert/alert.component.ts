import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() delay = 5000;
  public text!:string;
  public type="success"



  constructor(private alertService:AlertService) { }

  ngOnInit(): void {
    this.alertService.alert$.subscribe(alert =>{
      this.text = alert.text,
      this.type = alert.type

      const timeOut = setTimeout(() =>{
        clearTimeout(timeOut)
        this.text =''
      }, this.delay)
    })
  }

}
