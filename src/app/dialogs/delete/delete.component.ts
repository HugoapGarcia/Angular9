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
import {DataService} from '../../data.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * @function confirmDelete()
   * @description Listener on charge of delete item from current response localy.
   * @Note Current listener deletes item localy for test purposes.
   */
  confirmDelete(): void {
    this.dataService.deleteIssue(this.data.id);
  }

}
