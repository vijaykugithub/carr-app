import {Car} from './car';
import {createReducer,on} from '@ngrx/store'
import { carsFetchAPISuccess, deleteCarAPISuccess, saveCarAPISuccess, updateCarAPISuccess } from './cars.action';

export const initialState:ReadonlyArray<Car>=[];
export const carReducer= createReducer(
    initialState,
    on(carsFetchAPISuccess,(state,{allCars})=>{
     return allCars;
    }),
    on(saveCarAPISuccess,(state,{response})=>{
        let newState=[...state];
        newState.unshift(response);
        return newState;
    }),
    on(updateCarAPISuccess,(state,{response})=>{
        let newState=state.filter(_=>_.id !==response.id)
        newState.unshift(response);
        return newState;
    }),
    on(deleteCarAPISuccess,(state,{id})=>{
        let newState=state.filter(_=>_.id !==Number(id));
        return newState;
    })
)

