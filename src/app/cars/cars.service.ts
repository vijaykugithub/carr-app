import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Car } from './store/car';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private httpClient:HttpClient) { }
  getCars()
  {
   return this.httpClient.get<Car[]>('http://localhost:3000/cars');
  }
  createCar(payload:Car)
  {
    return this.httpClient.post<Car>('http://localhost:3000/cars',payload);
  }
  updateCar(payload:Car)
  {
    return this.httpClient.patch<Car>(`http://localhost:3000/cars/${payload.id}`,payload);
  }
  deleteCar(id:number)
  {
    return this.httpClient.delete(`http://localhost:3000/cars/${id}`);
  }
}
