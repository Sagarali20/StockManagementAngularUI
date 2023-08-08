import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { empty } from 'rxjs';
import SwalAlert from 'src/app/helpers/SwalAlert';
import validateForm from 'src/app/helpers/validationform';
import { Category } from 'src/app/models/Category';
import { Equipment } from 'src/app/models/Equipment';
import { CategoryService } from 'src/app/services/category.service';
import { EquipmentService } from 'src/app/services/equipment.service';
declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit  {

  @ViewChild('closebutton') closebutton: any;

  Categorys: Category[] = [];

  Equipment!:Equipment;

  Equipments:Equipment[]=[]




  testall : string="";


  constructor(private categoryservice: CategoryService,private equipmentservice:EquipmentService)
  {

  }
  ngOnInit(): void {

    this.RefreshPage();
    this.Categoryload();


  }

  SaveProduct()
  {
    if(this.EquipmentForm.valid)
    {
      this.Equipment = {

        id: parseFloat(this.EquipmentForm.value.id!),
        isActive: this.EquipmentForm.value.IsActive!,
        barcode: this.EquipmentForm.value.barcode!,
        categoryId: this.EquipmentForm.value.categoryId!,
        comments: this.EquipmentForm.value.comments!,
        description: this.EquipmentForm.value.description!,
        localCode: this.EquipmentForm.value.localCode!,
        name: this.EquipmentForm.value.name!,
        note: this.EquipmentForm.value.note!,
        rackNo: this.EquipmentForm.value.rackNo!,
        retail: parseFloat(this.EquipmentForm.value.retail!),
        sku: this.EquipmentForm.value.sku!,
        unit: this.EquipmentForm.value.unit!,
        wholeSalePrice: parseFloat(this.EquipmentForm.value.wholeSalePrice!)
      };

      console.log(this.Equipment);

      this.equipmentservice.SaveEquipment(this.Equipment).subscribe({
        next:(async res=>{
          console.log(res);
          if(res.result)
          {
            this.closebutton.nativeElement.click();
            this.RefreshPage();
            SwalAlert.SuccessMessage();

            this.EquipmentForm.reset();
            this.EquipmentForm.controls["categoryId"].setValue("");

          }
        }),
        error:(err=>{
             console.log(err.error.message)
        })
      })

      console.log(this.EquipmentForm.value);

    }
    else{
      validateForm.ValidateAllFromField(this.EquipmentForm);
    }
    
  }
  async DeleteClick(item: any) {
  
    if(await SwalAlert.IsDelete())
    {
      this.equipmentservice.deleteEquipment(item).subscribe({

        next:(async res=>{

          console.log(res);
          if(res)
          {
            this.RefreshPage();
            SwalAlert.DeleteMessage();
          }
        }),
        error:(err=>{
             console.log(err.error.message)
        })

      });

    }
  
}


  RefreshPage()
  {
    this.equipmentservice.GetAllEquipment().subscribe(res =>{
      this.Equipments=res.equipment;
      console.log(this.Equipments);

    })

  }

  Categoryload()
  {
    this.categoryservice.GetAllCategory().subscribe(res =>{

      this.Categorys=res.category;
     console.log(res.category);
     console.log(this.Categorys);

    });

  }

  EquipmentForm= new FormGroup({
    id: new FormControl(),
    name: new FormControl("",[Validators.required]),
    description: new FormControl(""),
    categoryId: new FormControl("",[Validators.required]),
    sku: new FormControl(""),
    retail: new FormControl("",[Validators.required, Validators.pattern('^[0-9]*$')]),
    repcost: new FormControl(""),
    wholeSalePrice: new FormControl("",[Validators.pattern('^[0-9]*$')]),
    unit: new FormControl(""),
    localCode: new FormControl(""),
    barcode: new FormControl(""),
    comments: new FormControl(""),
    note: new FormControl(""),      
    rackNo: new FormControl(""),
     IsActive : new FormControl(true),
  })

 



  get Productname():FormControl{
    return this.EquipmentForm.get('name') as FormControl;
  }
  get Category():FormControl{
    return this.EquipmentForm.get('categoryId') as FormControl;
  }
  get Retailprice():FormControl{
    return this.EquipmentForm.get('retail') as FormControl;
  }

}
