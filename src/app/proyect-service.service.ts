import { Injectable } from '@angular/core';
import { UserOperations } from './user-operations';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectService {

  constructor() { }
  existOperation = new BehaviorSubject<{ exist: boolean, forUser: string }>({ exist: false, forUser: undefined });
  lastOperations: UserOperations[] = [];
  saveOperation(name, val1, val2, val3) {
    const newUser = { ok: true, position: undefined };
    const newOperation = val1 + val2 + val3;
    if (this.lastOperations.length > 0) {
      this.lastOperations.forEach((element, index) => {
        if (element.name === name) {
          newUser.ok = false;
          newUser.position = index;

        }
        element.operations.forEach(((operation: string) => {

          if (operation === newOperation) {

            this.existOperation.next({ exist: true, forUser: element.name })

          }
        }));
      });

      if (newUser.ok === false && this.existOperation.getValue().exist === false) {
        this.lastOperations[newUser.position].operations.push(newOperation);
      }

      if (newUser.ok === true && this.existOperation.getValue().exist === false) {
        this.lastOperations.push({
          name,
          operations: [
            val1 + val2 + val3
          ]
        });
      }
    } else {
      this.lastOperations.push({
        name,
        operations: [
          val1 + val2 + val3
        ]
      });

    }
  }
}
