import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import validateForm from 'src/app/helpers/validationform';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {


  constructor()
  {

  }
  ngOnInit(): void {

  }



  SaveProduct()
  {
    console.log(this.Equipment.value);

    if(this.Equipment.valid)
    {

    }
    else{
      validateForm.ValidateAllFromField(this.Equipment);
    }
    
  }




  Equipment= new FormGroup({
    name: new FormControl("",[Validators.required]),
    description: new FormControl("",[Validators.required]),
    categoryId: new FormControl("",[Validators.required]),
    sku: new FormControl(""),
    retail: new FormControl("",[Validators.required, Validators.pattern('^[0-9]*$')]),
    repcost: new FormControl(""),
    wholeSalePrice: new FormControl("",[Validators.pattern('^[0-9]*$')]),
    unit: new FormControl("",[Validators.required]),
    localCode: new FormControl(""),
    barcode: new FormControl(""),
    comments: new FormControl(""),
    note: new FormControl(""),      
    rackNo: new FormControl(""),
     IsActive : new FormControl(true),
  })
  get Productname():FormControl{
    return this.Equipment.get('name') as FormControl;
  }
  get Category():FormControl{
    return this.Equipment.get('categoryId') as FormControl;
  }
  get Retailprice():FormControl{
    return this.Equipment.get('retail') as FormControl;
  }

}
