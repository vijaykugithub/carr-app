import {Car} from './car';
import {createFeatureSelector, createSelector} from '@ngrx/store'

export const carSelector= createFeatureSelector<Car[]>('cars');
export const selectCarById=(carId:number)=>{
    return createSelector(carSelector,(cars:Car[])=>{
        var carById=cars.filter(_=>_.id==carId);
        if(carById.length===0)
        {
            return null
        }
        return carById[0];
    })
}
