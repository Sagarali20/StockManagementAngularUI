import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent implements OnInit {
  ptoductId: any;
  constructor(private location: Location,private activateroute:ActivatedRoute) {}

  ngOnInit(): void {
    this.ptoductId = this.activateroute.snapshot.paramMap.get('id');
  }

  goBack(): void {
    this.location.back();
  }
}
