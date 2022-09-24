import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { registerLocaleData } from '@angular/common';

import localePe from '@angular/common/locales/es-PE';
import { LayoutModule } from './layout/layout.module';

registerLocaleData(localePe, 'es-PE');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    LayoutModule
  ],
  providers: [
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
