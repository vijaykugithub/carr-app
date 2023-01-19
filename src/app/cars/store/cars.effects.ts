import { Injectable } from "@angular/core";
import {Actions,createEffect,ofType} from '@ngrx/effects'
import { switchMap,map } from "rxjs";
import { CarsService } from "../cars.service";
import { carsFetchAPISuccess, deleteCarAPISuccess, invokeCarAPI, invokeDeleteCarAPI, invokeSaveCarAPI, invokeUpdateCarAPI, saveCarAPISuccess, updateCarAPISuccess } from "./cars.action";

@Injectable()
export class CarsEffects {
    constructor(private action$:Actions,private carsService: CarsService)
    {

    }
   xyz$=createEffect(()=>
   this.action$.pipe(
    ofType(invokeCarAPI),
    switchMap(()=>{
        return this.carsService.getCars()
        .pipe(
            map((data)=>carsFetchAPISuccess({allCars:data}))
        )
    })
   )
   )
   saveNewCar$=createEffect(()=>
   this.action$.pipe(
    ofType(invokeSaveCarAPI),
    switchMap((action)=>{
        return this.carsService.createCar(action.payload)
        .pipe(map((data)=>saveCarAPISuccess({response:data})))
    })
   ))
   updateCar$=createEffect(()=>
   this.action$.pipe(
    ofType(invokeUpdateCarAPI),
    switchMap((action)=>{
        return this.carsService.updateCar(action.payload)
        .pipe(map((data)=>updateCarAPISuccess({response:data})))
    })
   ))

   deleteCar$=createEffect(()=>
   this.action$.pipe(
    ofType(invokeDeleteCarAPI),
    switchMap((action)=>{
        return this.carsService.deleteCar(Number(action.id))
        .pipe(map((data)=>deleteCarAPISuccess({id:action.id})))
    })
   ))
}
