import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ForecastComponent } from './pages/forecast/forecast.component';
import { HomeComponent } from './pages/home/home.component';
import { RoutingModule } from './routing.module';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [AppComponent, ForecastComponent, HomeComponent, SpinnerComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
