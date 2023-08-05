import Swal from "sweetalert2";

export default class SwalAlert{
  static SuccessMessage() {
    Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Save has been successfully!.',
        showConfirmButton: false,
        timer: 1500
      }) 
    
    }
 static  UpdateMessage() {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Update has been successfully!.',
      showConfirmButton: false,
      timer: 1500
    })
  }



  static IsDelete() {

    return Swal.fire({
      position: 'top',
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Your delete logic here
        return true; // Return a message or any other value you want
      } else {
        return false; // Return a different message or value if the user cancels
      }
    });
  }

  static  DeleteMessage() {
    // Swal.fire({
    //   position: 'top',
    //   icon: 'success',
    //   title: 'Update has been successfully!.',
    //   showConfirmButton: false,
    //   timer: 1500
    // })

    Swal.fire({
      toast: true,
      position: 'top',
      icon: 'success',
      title: 'Deleted!',
      text: 'Your file has been deleted.',
      showConfirmButton: false,
      timer: 3000 // Adjust the duration as needed (in milliseconds)
    });
    
  }
  

}