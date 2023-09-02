import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { empty, filter } from 'rxjs';
import SwalAlert from 'src/app/helpers/SwalAlert';
import validateForm from 'src/app/helpers/validationform';
import { Category } from 'src/app/models/Category';
import { Equipment } from 'src/app/models/Equipment';
import { Stockfilter } from 'src/app/models/Stockfilter';
import { CategoryService } from 'src/app/services/category.service';
import { EquipmentService } from 'src/app/services/equipment.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit  {

  @ViewChild('closebutton') closebutton: any;
  @ViewChild('openbutton') openbutton: any;
  @ViewChild('pageclick') pageclick: any;

  Modeltitle = "";
  EquipmentId=0;
  Categorys: Category[] = [];
  Equipment!:Equipment;
  Equipments:Equipment[]=[]

  Stockfilter: Stockfilter = new Stockfilter;


  currentPage = 3;   // Current page
  itemsPerPage = this.Stockfilter.PageSize;
  totalitem=0;
  maxSize = 3; 
  asciiValue!: number;
  reloadpagenum!:number;


  constructor(private categoryservice: CategoryService,private equipmentservice:EquipmentService,private router: Router, private route: ActivatedRoute)
  {

  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const parameterValue = params['page'];
     this.reloadpagenum=parameterValue;
      alert(parameterValue);
     });
    this.Stockfilter.PageNo=1;
    this.RefreshPage();
    this.Categoryload();

    this.currentPage=3;

  }

  Search(Search: any) {
    this.Stockfilter.PageNo=1;
    this.Stockfilter.SearchText=encodeURIComponent(Search);
     console.log(this.Stockfilter);
    this.RefreshPage();
    };

    onKeyUp(event: KeyboardEvent): void {
      const inputValue = (event.target as HTMLInputElement).value;
      if(event.keyCode ===13 || inputValue ==="")
      {
        this.Stockfilter.PageNo=1;
         this.Stockfilter.SearchText=inputValue;
        this.RefreshPage();
      }
    }
    goToDetails(id: number): void {
      this.router.navigate(['/details', id]);
    }

  // ngAfterViewInit()
  // {
  //   this.currentPage=3;

  // }
  pageChanged(event: PageChangedEvent): void {
    this.Stockfilter.PageNo  = event.page;

    // console.log(this.Stockfilter.PageNo);
    this.RefreshPage();
    

    this.updateUrl(event.page);

  }


  updateUrl(page:any): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge'
    });
  }





  SaveProduct()
  {
    if(this.EquipmentForm.valid)
    {
     
      this.Equipment = {

        id: parseFloat(this.EquipmentForm.value.id || '0'),
        isActive: !!this.EquipmentForm.value.IsActive,
        barcode: this.EquipmentForm.value.barcode!,
        categoryId: this.EquipmentForm.value.categoryId!,
        comments: this.EquipmentForm.value.comments!,
        localCode: this.EquipmentForm.value.localCode || '',
        name: this.EquipmentForm.value.name!,
        note: this.EquipmentForm.value.note!,
        rackNo: this.EquipmentForm.value.rackNo!,
        retail: parseFloat(this.EquipmentForm.value.retail || '0'),
        sku: this.EquipmentForm.value.sku!,
        unit: this.EquipmentForm.value.unit!,
        wholeSalePrice: parseFloat(this.EquipmentForm.value.wholeSalePrice || '0'),
        categoryName:"",
        equipmentId:"00000000-0000-0000-0000-000000000000"
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

  AddClick()
  {
    this.Modeltitle="Add product";
    this.EquipmentForm.reset();
    this.EquipmentForm.controls["categoryId"].setValue("");


  }

  EditClick(item: any) {

    this.openbutton.nativeElement.click();
    this.Modeltitle="Edit Product"
    this.EquipmentForm.controls["id"].setValue(item.id);
    this.EquipmentForm.controls["name"].setValue(item.name);
    this.EquipmentForm.controls["categoryId"].setValue(item.categoryId);
    this.EquipmentForm.controls["sku"].setValue(item.sku);
    this.EquipmentForm.controls["retail"].setValue(item.retail);
    this.EquipmentForm.controls["wholeSalePrice"].setValue(item.wholeSalePrice);
    this.EquipmentForm.controls["unit"].setValue(item.unit);
    this.EquipmentForm.controls["localCode"].setValue(item.localCode);
    this.EquipmentForm.controls["barcode"].setValue(item.barcode);
    this.EquipmentForm.controls["rackNo"].setValue(item.rackNo);
    this.EquipmentForm.controls["IsActive"].setValue(item.isActive);
    this.EquipmentForm.controls["note"].setValue(item.note);


    // this.fromValue.controls["id"].setValue(item.id);
    // this.fromValue.controls["name"].setValue(item.name);
    // this.fromValue.controls["title"].setValue(item.title);
    // this.fromValue.controls["address"].setValue(item.address);
    // this.fromValue.controls["phone"].setValue(item.phone);
    //this.Address=item.address;
    console.log(item.name);
  }
  async DeleteClick(item: any) {
  
    if(await SwalAlert.IsDelete())
    {
      this.equipmentservice.deleteEquipment(item).subscribe({

        next:(async res=>{

          console.log(res);
          if(res.result)
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
    

    this.equipmentservice.FilterEquipment(this.Stockfilter).subscribe({
      next:(async res=>{
        console.log(res.equipmentlist);
        this.Equipments=res.equipmentlist;
        this.totalitem=res.count;
        alert("res");
        alert(this.reloadpagenum);

      }),
      error:(err=>{
           console.log(err.error.message)
      })
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
    categoryId: new FormControl("",[Validators.required]),
    sku: new FormControl(),
    retail: new FormControl("",[Validators.required, Validators.pattern('^[0-9]*$')]),
    wholeSalePrice: new FormControl("",[Validators.pattern('^[0-9]*$')]),
    unit: new FormControl(),
    localCode: new FormControl(),
    barcode: new FormControl(),
    comments: new FormControl(),
    note: new FormControl(""),      
    rackNo: new FormControl(),
    IsActive : new FormControl(true)

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
