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
import { DataService } from '../../data.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }

  ngOnInit(): void {
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

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
   * @description Dismiss modal listener.
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * @function stopEdit()
   * @description Listener on charge of update item from current response localy.
   * @Note Current listener updates item localy for test purposes.
   */
  stopEdit(): void {
    this.dataService.updateIssue(this.data);
  }


}
