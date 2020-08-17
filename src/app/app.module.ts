import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FlightBookingModule } from './flight-booking/flight-booking.module';
const DEBUG = true;

@NgModule({
   imports: [
      BrowserModule,
      HttpClientModule,
      FlightBookingModule,
   ],
   declarations: [
      AppComponent,
      SidebarComponent,
      NavbarComponent,
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
