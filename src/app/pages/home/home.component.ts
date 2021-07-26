import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { WeatherService } from '../../../services/weather.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isLoading = false;
  error : any;
  controlForm: FormGroup;
  name = 'Angular';
  zipCodes : string[] = localStorage.getItem("listZipcode")? JSON.parse(localStorage.getItem("listZipcode")) : [];
  weathers = [];
  constructor(
    private fb: FormBuilder,
    private weatherService : WeatherService,
    private router: Router
  ) {
    this.initForm();
    this.loadWeatherByZipCode();
  }

  initForm() {
    this.controlForm = this.fb.group({
      zipCode: ["", [
        Validators.required, 
        Validators.minLength(5), 
        Validators.pattern("^[0-9]{5}$")]],
    });
  }

  listZipCode() {
    this.isLoading = true;
    let zipCodeForm = this.controlForm.controls.zipCode.value;
    this.weatherService.getWeather(this.controlForm.controls.zipCode.value).subscribe(
      (weather) => {
        weather.zipCode = zipCodeForm;
        weather.imgLink = this.weatherService.getImageLink(weather.weather[0].icon);
        this.weathers.push(weather);
        this.isLoading = false;
        this.zipCodes.push(zipCodeForm);
        localStorage.setItem("listZipcode", JSON.stringify(this.zipCodes));
      },
      (error) => {
        this.isLoading = false;
      })
    this.controlForm.reset();
  }

  loadWeatherByZipCode() {
    this.zipCodes.map( zipCode => 
      this.weatherService.getWeather(zipCode).subscribe(
        (weather) => {
          weather.zipCode = zipCode;
          weather.imgLink = this.weatherService.getImageLink(weather.weather[0].icon);
          this.weathers.push(weather)
        },
        (error) => {
          console.log(error)
        })
    )
  }

  goForecast(zipCode) {
    this.router.navigate([`/forecast/${zipCode}`]);
  }

  removeWeather(zipCode) {
    this.weathers = this.weathers.filter(function(el) { return el.zipCode != zipCode; }); 
    this.zipCodes = this.zipCodes.filter(function(el) { return el != zipCode; })
    localStorage.setItem("listZipcode", JSON.stringify(this.zipCodes))
  }
}
