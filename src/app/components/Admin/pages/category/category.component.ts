import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import SwalAlert from 'src/app/helpers/SwalAlert';
import validateForm from 'src/app/helpers/validationform';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/category.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

   @ViewChild('closebutton') closebutton: any;
   public Categorys:any=[];
  //  @ViewChild('closebutton')
  //  closebutton!: ElementRef;

  constructor(private categoryservice:CategoryService)
  {

  }
  ngOnInit(): void {
    this.RefreshPage();
  }

  Category= new FormGroup({
    name: new FormControl("",[Validators.required]),
  })

  CategorySubmited()
  {
    if(this.Category.valid)
    {
      this.categoryservice.SaveCategory(this.Category.value).subscribe({
        next:(async res=>{
          this.closebutton.nativeElement.click();
          if(res.result)
          {
            this.RefreshPage();
            SwalAlert.SuccessMessage();
            this.Category.reset();
          }
        }),
        error:(err=>{
             console.log(err.error.message)
        })
      })
         console.log(this.Category.value);
    }
    else{
      validateForm.ValidateAllFromField(this.Category);
    }
  }
 async DeleteClick(item: any) {
      if(await SwalAlert.IsDelete())
      {
        this.categoryservice.DeleteCategory(item).subscribe({

          next:(async res=>{
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
    this.categoryservice.GetAllCategory().subscribe(res =>{
      this.Categorys=res.category;
      console.log(this.Categorys);
     });

   }

  get Categoryname():FormControl{
    return this.Category.get('name') as FormControl;
  }

}
