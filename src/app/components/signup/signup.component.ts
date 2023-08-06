import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import validateForm from 'src/app/helpers/validationform';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  type :string ="password";
  istext :boolean=false;
  eyeicon:string="fa-eye-slash" 

  repeatpass:string ='none';
  email  :string ='none';


constructor(private authService: AuthService,private user:User,private router:Router ){}

  ngOnInit(): void {

    // this.signup = this.fb.group({
      
    //   firstname:['',Validators.required],
    //   lastname :['',Validators.required],
    //   username :['',Validators.required],
    //   password :['',Validators.required],
    //   email: ['', Validators.required]
      
    // })

  }


  signup= new FormGroup({

    firstname: new  FormControl("",[Validators.required,Validators.minLength(2),Validators.pattern("[a-zA-Z].*")]),
    lastname: new  FormControl("",[Validators.required,Validators.minLength(2),Validators.pattern("[a-zA-Z].*")]),
    phone: new  FormControl("",[Validators.required,Validators.minLength(10),Validators.maxLength(11),Validators.pattern("[0-9]*")]),
    username: new FormControl("",[Validators.required]),
    password: new FormControl("",[Validators.required,Validators.minLength(1),Validators.maxLength(15)]),
    email: new FormControl("",[Validators.required,Validators.email]),
    rewp:new FormControl("",Validators.required) 
  })

  SingnupSubmited()
  {
     
   // console.log(this.signup.value);

    if(this.signup.valid)
    {
      console.log("valid");
      this.repeatpass='none';
      if(this.Password.value==this.Rewp.value)
      {
        console.log(this.signup.value);

        this.user.FirstName=this.Firstname.value;
        this.user.LastName=this.Lastname.value;
        this.user.Username=this.Username.value;
        this.user.Password=this.Password.value;
        this.user.Email=this.Email.value;


         this.authService.signUp(this.user).subscribe({

          next:(res=>{
            if(res.result)
            {
            this.signup.reset();
            this.router.navigate(['login']);
            }
            if(!res.result){
               this.email="inline";;
               console.log(res.message)

            }

          }),
          error:(err=>{
               console.log(err.error.message)
          })
         })      
      }
      else{
        this.repeatpass='inline';
      }
       //database

      
    }
    else{
      alert("invalid");
      console.log(this.signup);

      validateForm.ValidateAllFromField(this.signup);

    }
  }


  get Firstname():FormControl{

    return this.signup.get('firstname') as FormControl;
  }
  get Lastname():FormControl{

    return this.signup.get('lastname') as FormControl;
  }
  get Username() : FormControl{

    return this.signup.get('username') as FormControl
  }
  get Password() : FormControl{

    return this.signup.get('password') as FormControl
  }

 get Rewp():FormControl{

  return this.signup.get('rewp') as FormControl;
 }

  get Email() : FormControl{

    return this.signup.get('email') as FormControl
  }
  get Phone() : FormControl{

    return this.signup.get('phone') as FormControl
  }






  hideShowPass()
  {
    this.istext=!this.istext;
    this.istext ? this.eyeicon='fa-eye':this.eyeicon='fa-eye-slash';
    this.istext ? this.type='text':this.type='password';
  }


  SubmitSingup()
  {
    if(this.signup.valid)
    {
      console.log(this.signup);
    }
    else{

     //  validateForm.ValidateAllFromField(this.signup);

    }

  }





}
