import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EquipmentService } from 'src/app/services/equipment.service';
import { Equipment } from 'src/app/models/Equipment';
import { Stockfilter } from 'src/app/models/Stockfilter';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import validateForm from 'src/app/helpers/validationform';
import SwalAlert from 'src/app/helpers/SwalAlert';
import { InventoryWarehouse } from 'src/app/models/InventoryWarehouse';
import { InventoryWarehouseService } from 'src/app/services/inventory-warehouse.service';


@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']

})
export class ProductdetailsComponent implements OnInit {
  ptoductId: any;
  InventoryWarehouse!:InventoryWarehouse;
  InventoryWarehouseList:InventoryWarehouse[]=[];

  Stockfilter: Stockfilter = new Stockfilter;
  @ViewChild('openbutton') openbutton: any;
  @ViewChild('closebutton') closebutton: any;

  public damage:boolean=true;

  Equipment: Equipment | undefined;

  

  constructor(private location: Location,private activateroute:ActivatedRoute,private equipmentservice:EquipmentService,private InventoryWarehouseService:InventoryWarehouseService) {}


  ngOnInit(): void {
    this.ptoductId = this.activateroute.snapshot.paramMap.get('id');


    this.equipmentservice.GetEquipmentbyId(this.ptoductId).subscribe({
      next:(async res=>{
       this.Equipment=res.equipment;
       console.log(res.equipment);
       this.Warehouse.controls['equipmentid'].setValue(this.Equipment?.equipmentId);
       this.RefreshPage();


      }),
      error:(err=>{
           console.log(err.error.message)
      })
    })

  }


  onDropdownChange(event: any) {
       if(event==="Damage")
       {         
        this.damage=false;
       }
       else{
        this.damage=true;
       }
  }

  goBack(): void {

    this.location.back();
  }

   Warehouse= new FormGroup({
    type:new FormControl("",[Validators.required]),
    quantity:new FormControl("",[Validators.required, Validators.pattern('^[0-9]*$')]),
    price :new FormControl(0),
    description : new FormControl(),
    equipmentid:new FormControl()
   }); 

   RefreshPage()
   {

    this.InventoryWarehouseService.GetAllWarehouse(this.Equipment?.equipmentId).subscribe({
      next:(async res=>{
        this.InventoryWarehouseList=res.data;

      }),
      error:(err=>{
           console.log(err.error.message)
      })
    })

   }

   OpenClick()
   {

    this.damage=true;
    this.Warehouse.reset();
    this.Warehouse.controls["type"].setValue("");
    this.Warehouse.controls['price'].setValue(0);
    this.Warehouse.controls['equipmentid'].setValue(this.Equipment?.equipmentId);

   }

  SavaWarehouse()
  {

    if(this.Warehouse.valid)
    {

      // this.InventoryWarehouse = {

      //   type: this.Warehouse.value.type!,
      //   quantity: parseFloat(this.Warehouse.value.quantity || '0') ,
      //   description: this.Warehouse.value.description!,
      //   price: parseFloat(this.Warehouse.value.price || '0'),
      //   equipmentid: this.Warehouse.value.equipmentid!,
      //   lastUpdatedDate :null

      // };

      this.InventoryWarehouseService.SaveWarehouse(this.Warehouse.value).subscribe({
        next:(async res=>{
          if(res.result)
          {
  
            SwalAlert.SuccessMessage();
            this.RefreshPage();

            this.Warehouse.reset();
            this.closebutton.nativeElement.click();
            this.Warehouse.controls["type"].setValue("");
            this.Warehouse.controls['equipmentid'].setValue(this.Equipment?.equipmentId);
          }
        }),
        error:(err=>{
             console.log(err.error.message)
        })
      })

    }
    else{

      validateForm.ValidateAllFromField(this.Warehouse);

    }
  }

  isNegativeNumber(value: number): boolean {
    return value < 0;
  }

  get Type():FormControl{
    return this.Warehouse.get('type') as FormControl;
  }
  get Quantity():FormControl{
    return this.Warehouse.get('quantity') as FormControl;
  }
  get Price():FormControl{
    return this.Warehouse.get('price') as FormControl;
  }
}
