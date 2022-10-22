import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { AppRoutingModule } from 'src/app/app-routing.module';
import { CheckoutPageComponent } from './checkout-page.component';
import { CheckoutRoutingModule } from './checkout-routing.module';


@NgModule({
  declarations: [
    CheckoutPageComponent
  ],
  imports: [
   // AppRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    CheckoutRoutingModule
  ]
})
export class CheckOutModule { }