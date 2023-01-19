import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { carReducer } from './store/cars.reducer';
import { CarsEffects } from './store/cars.effects';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CarsRoutingModule,
    StoreModule.forFeature('cars',carReducer),
    EffectsModule.forFeature([CarsEffects])
  ]
})
export class CarsModule { }
