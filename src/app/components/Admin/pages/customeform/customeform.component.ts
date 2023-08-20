import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-customeform',
  templateUrl: './customeform.component.html',
  styleUrls: ['./customeform.component.scss']
})
export class CustomeformComponent implements OnInit {

  @ViewChild('openbutton') openbutton: any;
  Modeltitle = "";


  ngOnInit(): void {
 

  }
  AddClick(id:any)
  {
    this.openbutton.nativeElement.click();
    this.Modeltitle="Add-Customer"

  }



}
