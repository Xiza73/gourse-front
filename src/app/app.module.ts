
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { registerLocaleData } from '@angular/common';
//import { NgxToastNotifyModule , NgxToastNotifyService } from "ngx-toast-notify";
import {MatInputModule} from '@angular/material/input';
import localePe from '@angular/common/locales/es-PE';
import { LayoutModule } from './layout/layout.module';
//import { CheckoutPageComponent } from './modules/checkout-page/checkout-page.component';
//import { MatFormFieldModule } from '@angular/material/form-field/form-field-module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CheckOutModule } from './modules/checkout-page/checkout-page.module';


registerLocaleData(localePe, 'es-PE');

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [

    MatInputModule,
    MatFormFieldModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    LayoutModule,
    CheckOutModule
  ],
  providers: [
    //NgxToastNotifyService,
    {
      provide: LOCALE_ID,
      useValue: 'es-PE'
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'PEN'
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
