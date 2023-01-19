import {createAction,props} from '@ngrx/store'
import { Car } from './car'
export const invokeCarAPI=createAction(
    "[Cars API] invoke cars fetch API"
)
export const carsFetchAPISuccess=createAction(
    "[Cars API] carsFetchAPISuccess",
    props<{allCars:Car[]}>()
)
export const invokeSaveCarAPI=createAction(
    "[Cars API] invoke save Car API",
    props<{payload:Car}>()
)
export const saveCarAPISuccess=createAction(
    "[Cars API]  save Car API success",
    props<{response:Car}>()
)

export const invokeUpdateCarAPI=createAction(
    "[Cars API] invoke update Car API",
    props<{payload:Car}>()
)
export const updateCarAPISuccess=createAction(
    "[Cars API]  update Car API success",
    props<{response:Car}>()
)
export const invokeDeleteCarAPI=createAction(
    "[Cars API] invoke delete Car API",
    props<{id:number}>()
)
export const deleteCarAPISuccess=createAction(
    "[Cars API]  delete Car API success",
    props<{id:number}>()
)