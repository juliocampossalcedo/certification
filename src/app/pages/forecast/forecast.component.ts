import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from 'src/services/weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {
  forecasts = [];
  zipCode: string;
  city: string;
  isLoading = true;

  constructor(private route: ActivatedRoute,
    private weatherService : WeatherService
  ) { }

  ngOnInit(): void {
    this.zipCode = this.route.snapshot.paramMap.get('zipcode');
    this.getForecast();
  }


  getForecast() {
    this.weatherService.getForecastWeather(this.zipCode).subscribe(
      (forecasts) => {
        this.city = forecasts.city.name
        forecasts.list.map((forecast, index) => {
          if((index + 4) % 8 === 0) {
            let icon = forecast.weather[0].icon;
            forecast.imgLink = this.weatherService.getImageLink(icon);
            this.forecasts.push(forecast)
          }
        })
        this.isLoading = false;
      })
  }

}
