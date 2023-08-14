import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EquipmentService } from 'src/app/services/equipment.service';
import { Equipment } from 'src/app/models/Equipment';
import { Stockfilter } from 'src/app/models/Stockfilter';


@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent implements OnInit {
  ptoductId: any;
  Stockfilter: Stockfilter = new Stockfilter;
  @ViewChild('openbutton') openbutton: any;


  Equipment: Equipment | undefined;

  constructor(private location: Location,private activateroute:ActivatedRoute,private equipmentservice:EquipmentService) {}


  ngOnInit(): void {
    this.ptoductId = this.activateroute.snapshot.paramMap.get('id');


    this.equipmentservice.GetEquipmentbyId(this.ptoductId).subscribe({
      next:(async res=>{

        console.log(res.equipment);

       this.Equipment=res.equipment;
      }),
      error:(err=>{
           console.log(err.error.message)
      })
    })
  }

  goBack(): void {
    this.location.back();
  }
}
