/*
* Original author: HG
* Latest contributor: HG
* Client name: CreativEngine
* Project name: WIDGET - CRUD
* Project number: 
* Main purpose: CRUD of widgets by using Agular 9 && angular material.
**/
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {DataService} from '../data.service';
import {WidgetElement} from '../models/widget';

import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  //Variables
  displayedColumns = ['id', 'title', 'url', 'created_at', 'updated_at', 'price','author'];
  dataSource: any;
  exampleDatabase: DataService | null;

  constructor(public router:Router) { 
    this.loadData(this.router.getCurrentNavigation().extras.state)
  
  }
 /**
  * @function back()
  * @description Redirect (home) redirect listener.
  */
  back() {
    this.router.navigateByUrl('/')
  }

  ngOnInit() {
  }

  /**
   * @function loadData()
   * @param value type any
   * @description Get and set specific object value to be display,
   * and show details.
   */
  loadData(value:any) {
    !value? this.back(): null;
    let array:any = [];
    array.push(value);
    let specificItem: WidgetElement[] = array;
    this.dataSource = new MatTableDataSource(specificItem);
  } 
}

