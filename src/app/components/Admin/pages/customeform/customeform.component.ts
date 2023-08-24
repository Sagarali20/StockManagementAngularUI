import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import SwalAlert from 'src/app/helpers/SwalAlert';
import validateForm from 'src/app/helpers/validationform';
import { Customer } from 'src/app/models/Customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customeform',
  templateUrl: './customeform.component.html',
  styleUrls: ['./customeform.component.scss']
})
export class CustomeformComponent implements OnInit {

  @ViewChild('closebutton') closebutton: any;
  @ViewChild('openbutton') openbutton: any;
  Modeltitle = "";
  Customer! : Customer 

  constructor(private CustomerService:CustomerService)
  {

  }

  ngOnInit(): void {
 

  }


  AddClick(id:any)
  {
    this.openbutton.nativeElement.click();
    this.Modeltitle="Add-Customer"
    this.CustomerForm.reset();
    this.CustomerForm.controls['customerType'].setValue("");

  }

  SaveCustomer()
  {
    if(this.CustomerForm.valid)
    {

      this.Customer= {
        id:0,
        firstName:this.CustomerForm.value.firstName!,
        lastName:this.CustomerForm.value.lastName!,
        phoneNumber:this.CustomerForm.value.cellNumber!,
        type:this.CustomerForm.value.customerType!,
        emailAddress:this.CustomerForm.value.emailAddress!,
        address:this.CustomerForm.value.address!,
        isWholeSaler:!!this.CustomerForm.value.isWholeSaler,
        isActive:true
      };

      this.CustomerService.SaveCustomer(this.Customer).subscribe({
        next:(async res=>{
          console.log(res);
          if(res.result)
          {
            this.closebutton.nativeElement.click();
          //  this.RefreshPage();
            SwalAlert.SuccessMessage();
            this.CustomerForm.reset();

          }
        }),
        error:(err=>{
             console.log(err.error.message)
        })
      })
     
    }
    else{
      validateForm.ValidateAllFromField(this.CustomerForm);

    }

  }

  CustomerForm= new FormGroup({
    firstName: new FormControl("",[Validators.required]),
    lastName: new FormControl(),
    cellNumber:new FormControl("",[Validators.required,Validators.pattern('^[0-9]*$')]),
    customerType: new FormControl("",Validators.required),
    emailAddress: new FormControl(),
    address: new FormControl(),
    isWholeSaler : new FormControl()
  })

  get FirstName():FormControl{
    return this.CustomerForm.get('firstName') as FormControl;
  }
  get Lastname():FormControl{
    return this.CustomerForm.get('lastName') as FormControl;
  }
  get CellNumber():FormControl{
    return this.CustomerForm.get('cellNumber') as FormControl;
  }
  get CustomerType():FormControl{
    return this.CustomerForm.get('customerType') as FormControl;
  }
  get EmailAddress():FormControl{
    return this.CustomerForm.get('emailAddress') as FormControl;
  }
  get Address():FormControl{
    return  this.CustomerForm.get('address') as FormControl;
  }
  get IswholeSaler():FormControl{
    return this.CustomerForm.get('isWholeSaler') as FormControl;
  }

}
