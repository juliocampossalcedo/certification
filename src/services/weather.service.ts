import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { apiId, forecastApi, urlApi } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(zipCode: string): Observable<any> {
    const zipCodeUrl = `${urlApi}?zip=${zipCode}&appid=${apiId}`;
    return this.http.get<any>(zipCodeUrl).pipe(
      catchError(this.handleError)
    );
  }

  getForecastWeather(zipCode: string): Observable<any> {
    const zipCodeUrl = `${forecastApi}?zip=${zipCode}&appid=${apiId}`;
    return this.http.get<any>(zipCodeUrl);
  }

  getImageLink(icon: string) : string {
    switch (icon) {
      case '01d':
      case '01n': 
        return 'https://www.angulartraining.com/images/weather/sun.png';
      case '03d':
      case '03n': 
      case '04d':
      case '04n': 
      case '02d':
      case '02n': 
        return 'https://www.angulartraining.com/images/weather/clouds.png';
      case '09d':
      case '09n': 
      case '10d':
      case '10n':
      case '11d':
      case '11n': 
        return 'https://www.angulartraining.com/images/weather/rain.png';
      case '13d':
      case '13n':
      case '50d':
      case '50n': 
        return 'https://www.angulartraining.com/images/weather/snow.png';
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      return throwError('City not found');
    } else {
      return throwError('Something bad happened; please try again later.');
    }
  }
}
