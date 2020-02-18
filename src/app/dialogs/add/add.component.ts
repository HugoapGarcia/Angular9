/*
* Original author: HG
* Latest contributor: HG
* Client name: CreativEngine
* Project name: WIDGET - CRUD
* Project number: 
* Main purpose: CRUD of widgets by using Agular 9 && angular material.
**/
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';

import {DataService} from '../../data.service';
import {WidgetElement} from '../../models/widget';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WidgetElement, public dataService: DataService) { }

  ngOnInit(): void {
  }
  //simple form control validator.
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  /**
   * @function getErrorMessage()
   * @description Return string message for field reqiered.
   */
  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
  // emppty stuff
  }

  /**
   * @function onNoClick()
   * @description Close event listner to dismiss modal.
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * @funcition confirmAdd()
   * @description Confirmation listener and add new item to list.
   * @Note: Current listener add new item localy for example purposes.
   */
  public confirmAdd(): void {
    this.dataService.addIssue(this.data);
  }

}
