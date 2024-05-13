import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtcToLocalTimePipe } from './pipes/utc-to-local-time.pipe';



@NgModule({
  declarations: [
    UtcToLocalTimePipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
