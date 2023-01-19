import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Store, select } from '@ngrx/store'
import { Car } from '../store/car';
import { invokeCarAPI, invokeDeleteCarAPI, invokeSaveCarAPI, invokeUpdateCarAPI } from '../store/cars.action';
import { carSelector, selectCarById } from '../store/cars.selector';
declare var window: any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styles: [
    'a { cursor: pointer; }'
  ]
})
export class HomeComponent implements OnInit {
  public carformGroup!: FormGroup;
  car!: Car;
  showAdd!: boolean;
  showUpdate!: boolean;
  constructor(private store: Store) {
  }
  cars$ = this.store.pipe(select(carSelector))
  formModal: any;
  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('exampleModal')
    );
    this.carformGroup = new FormGroup({
      carNumberPlate: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6)
      ]),
      carOwner: new FormControl('', [
        Validators.required,
      ]),
      id: new FormControl()
    });
    this.store.dispatch(invokeCarAPI());
  }
  openCarModal() {
    this.showAdd = true;
    this.showUpdate = false;
    this.carformGroup.reset();
    this.formModal.show();
  }
  get carNumberPlate() {
    return this.carformGroup?.get('carNumberPlate')!;
  }

  get carOwner() {
    return this.carformGroup?.get('carOwner')!;
  }
  public validate() {
    if (this.carformGroup.invalid) {
      for (const control of Object.keys(this.carformGroup.controls)) {
        this.carformGroup.controls[control].markAsTouched();
      }
      return;
    }
    const getCarValue = this.carformGroup.value.carNumberPlate;
    const carValue = this.removeWhiteSpaces(getCarValue);
    const result = this.validateCarNumber(this.carformGroup.value.carNumberPlate)
    if (result !== null && !result) {
      alert("enter the valid car number start first 3 - letters and then last 3 numbers.");
      return;
    }
    const obj = {
      id: Math.floor((Math.random() * 10000) + 1),
      carNumberPlate: carValue,
      carOwner: this.carformGroup.value.carOwner
    }
    console.log(this.carformGroup.value.carNumberPlate);
    this.store.dispatch(invokeSaveCarAPI({ payload: { ...obj } }));
    this.formModal.hide();
    this.carformGroup.reset();
  }
  removeWhiteSpaces(value: string) {
    return value.replace(/ /g, '')
  }
  deleteCar(item: number) {
    if (confirm("Are you sure to delete " + item)) {
      this.store.dispatch(invokeDeleteCarAPI({ id: item }));
    }
  }
  editCar(item: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.carformGroup.controls["id"] = item.id;
    this.carformGroup.controls["carNumberPlate"].setValue(item.carNumberPlate);
    this.carformGroup.controls["carOwner"].setValue(item.carOwner);
    let temp = this.store.pipe(select(selectCarById(item.id)));
    temp.subscribe((data) => {
      if (data) {
        this.formModal.show();
      } else {
        console.log(item)
      }
    })
  }
  public updateCar() {
    if (this.carformGroup.invalid) {
      for (const control of Object.keys(this.carformGroup.controls)) {
        this.carformGroup.controls[control].markAsTouched();
      }
      return;
    }
    const getCarValue = this.carformGroup.value.carNumberPlate;
    const carValue = this.removeWhiteSpaces(getCarValue);
    const id: number = +this.carformGroup.controls["id"];
    let obj = {
      id: id,
      carNumberPlate: carValue,
      carOwner: this.carformGroup.value.carOwner
    }
    this.formModal.hide();
    this.store.dispatch(invokeUpdateCarAPI({ payload: { ...obj } }));

  }
  closeCarModal() {
    this.formModal.hide();

  }
  validateCarNumber(data: any) {
    const value: string = data;
    if (value) {
      let letter = value.substring(0, 3);
      let res = /^[a-zA-Z]+$/.test(letter);
      let num = value.substring(value.length - 3);
      let validNum = /^\d+\.?\d*$/.test(num);
      if (res && validNum) {
        return true;
      } else {
        return false;
      }
    } else {
      return null;
    }
  }
}
