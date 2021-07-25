import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  controlForm: FormGroup;
  name = 'Angular';
  zipCodes : [string] = localStorage.getItem("listZipcode")? JSON.parse(localStorage.getItem("listZipcode")) : [];
  constructor(
    private fb: FormBuilder,
  ) {
    this.initForm();
  }

  initForm() {
    this.controlForm = this.fb.group({
      zipCode: ["", [
        Validators.required, 
        Validators.minLength(5), 
        Validators.pattern("^[0-9]{5}(?:-[0-9]{4})?$")]],
    });
  }

  onChange() {
    console.log(this.controlForm)
  }

  listZipCode () {
    this.zipCodes.push(this.controlForm.controls.zipCode.value);
    localStorage.setItem("listZipcode", JSON.stringify(this.zipCodes));
    this.controlForm.reset();
  }
}
