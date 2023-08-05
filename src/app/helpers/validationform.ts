import { FormControl, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";

export default class validateForm{

  static ValidateAllFromField(formgroup:FormGroup)
  {

    Object.keys(formgroup.controls).forEach(field =>{

      const controls=formgroup.get(field);

      if(controls instanceof FormControl)
      {
         controls.markAsDirty({onlySelf:true});
      }
      else if(controls instanceof FormGroup){
             
        this.ValidateAllFromField(controls);
      }
    })

  }

}
  //Popup Message here



