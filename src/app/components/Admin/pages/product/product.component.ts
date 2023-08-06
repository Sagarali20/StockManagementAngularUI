import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import validateForm from 'src/app/helpers/validationform';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/category.service';
declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit,AfterViewInit  {


  public Categorys:any=[];



  constructor(private categoryservice: CategoryService)
  {

  }
  ngOnInit(): void {

    this.Categoryload();

  }
  ngAfterViewInit(): void {


   // $(this.elementRef.nativeElement).find('.select2').select2();   

  }

  Categoryload()
  {

    this.categoryservice.GetAllCategory().subscribe(res =>{

     this.Categorys=res.category;
     console.log(this.Categorys);

    });

  }

  SaveProduct()
  {

    if(this.Equipment.valid)
    {
      console.log(this.Equipment.value);

    }
    else{
      validateForm.ValidateAllFromField(this.Equipment);
    }
    
  }

  Equipment= new FormGroup({
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
    return this.Equipment.get('name') as FormControl;
  }
  get Category():FormControl{
    return this.Equipment.get('categoryId') as FormControl;
  }
  get Retailprice():FormControl{
    return this.Equipment.get('retail') as FormControl;
  }

}
