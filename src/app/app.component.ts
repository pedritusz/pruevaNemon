import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProyectService } from './proyect-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private fb: FormBuilder, private service: ProyectService, ) {

  }
  result = undefined;
  nemonForm = this.fb.group({

    userName: ['', Validators.required],
    firstInput: ['', Validators.required],
    secondInput: ['', Validators.required],
    thirdInput: ['', Validators.required],

  });

  ngOnInit() {
    this.service.existOperation.subscribe((exist) => {
      if (exist.exist === true) {
        alert(`${exist.forUser} ya hizo esta consulta`);
      }
    });
  }

  sendName() {
    this.result = undefined;
    let alphanumeric = false;
    let newInputs;
    if (this.nemonForm.valid) {
      const inputs = [
        this.nemonForm.get('firstInput').value,
        this.nemonForm.get('secondInput').value,
        this.nemonForm.get('thirdInput').value,
      ];
      newInputs = inputs;
      inputs.forEach((value) => {
        if (/^[1-9]/.test(value)) {
        } else {
          alphanumeric = true;
        }
      });

      if (alphanumeric) {

        inputs.forEach((value) => {
          if (this.result) {
            this.result += value;
          } else {
            this.result = value;
          }
        });
      } else {
        inputs.forEach((value) => {
          if (this.result) {
            this.result = parseInt(value) + this.result;
          } else {
            this.result = parseInt(value)

          }
        })
      }
      // tslint:disable-next-line: one-variable-per-declaration
      const name = this.nemonForm.get('userName').value;
      const input1 = inputs[0];
      const input2 = inputs[1];
      const input3 = inputs[2];
      this.service.saveOperation(name, input1, input2, input3)
    } else {
      alert('rellena todos los campos')
    }
  }



}
