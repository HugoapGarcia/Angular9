/*
* Original author: HG
* Latest contributor: HG
* Client name: CreativEngine
* Project name: WIDGET - CRUD
* Project number: 
* Main purpose: CRUD of widgets by using Agular 9 && angular material.
**/
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../data.service';
import {HttpClient} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {WidgetElement} from '../models/widget';
import {DataSource} from '@angular/cdk/collections';
import {AddComponent} from '../dialogs/add/add.component';
import {EditComponent} from '../dialogs/edit/edit.component';
import {DeleteComponent} from '../dialogs/delete/delete.component';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';


import * as myJson from '../helpers/content.json'
import { Router } from '@angular/router';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  //Global variables
  displayedColumns = ['id', 'title', 'url', 'created_at', 'updated_at', 'price', 'actions'];
  exampleDatabase: DataService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: number;

  constructor(public httpClient: HttpClient,
              public router: Router,
              public dialog: MatDialog,
              public dataService: DataService) {}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  public refresh() {
    this.loadData();
  }

  /**
   * @function addNew()
   * @description Event listener on charge of open modal and add new item on real time,
   * and display it on table list.
   */
  public addNew() {
    let issue: WidgetElement = new WidgetElement;
    const dialogRef = this.dialog.open(AddComponent, {
      data: {issue: issue }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      }
    });
  }

  /**
   * @function startEdit()
   * @param i 
   * @param id 
   * @param title 
   * @param state 
   * @param url 
   * @param created_at 
   * @param updated_at 
   * @description Event listener on charge of open modal edit, and update selected item,
   * save on realy time and displayit on table list.
   */
  public startEdit(i: number, id: number, title: string, state: string, url: string, created_at: string, updated_at: string) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditComponent, {
      data: {id: id, title: title, state: state, url: url, created_at: created_at, updated_at: updated_at}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  /**
   * @function deleteItem()
   * @param i 
   * @param id 
   * @param title 
   * @param state 
   * @param url 
   * @description Event listener on charge of delete selected item and display on 
   * table list on real time.
   * @Note Current accition works only for realy time test purposes.
   */
  public deleteItem(i: number, id: number, title: string, state: string, url: string) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {id: id, title: title, state: state, url: url}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }

  /**
   * @function infoItem()
   * @param i 
   * @param id 
   * @param title 
   * @param state 
   * @param url 
   * @description Event listener on charge of retreiving current item selected, parse
   * and look in response and send to detail route to display details of specific item. 
   */
  public infoItem(i: number, id: number, title: string, state: string, url: string) {
    // this.router.navigateByUrl('/details', { state: { id:1 , name:'Angular' }});
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
   
    const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
    this.router.navigateByUrl('/details', { state: this.exampleDatabase.dataChange.value[foundIndex] });
  }

 /**
  * @function refreshTable()
  * @description Refresh pagination and updated if response got any change.
  */
  private refreshTable() {
    // Refreshing table using paginator
    this.paginator._changePageSize(this.paginator.pageSize);
  }

 /**
  * @function loadData()
  * @description Event listener on charge of loading data retreived from end-point,
  * populated dataSource to displya on UI.
  */
  public loadData() {
    this.exampleDatabase = new DataService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

}
// exteded class
export class ExampleDataSource extends DataSource<WidgetElement> {
  _filterChange = new BehaviorSubject('');
 
  /**
   * @description filter value and return string.
   */
  get filter(): string {
    return this._filterChange.value;
  }

  /**
   * @description filter, return string and push to changed.
   */
  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: WidgetElement[] = [];
  renderedData: WidgetElement[] = [];

  constructor(public _exampleDatabase: DataService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /**
   * @function connect()
   * @description Connect function called by the table to retrieve one stream 
   * containing the data to render.
   */
  connect(): Observable<WidgetElement[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllIssues();


    return merge(...displayDataChanges).pipe(map( () => {
        // Filter data
        this.filteredData = this._exampleDatabase.data.slice().filter((issue: WidgetElement) => {
          const searchStr = (issue.id + issue.title + issue.url + issue.created_at).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      }
    ));
  }

  disconnect() {}


  /**
   * @function sortData
   * @param data 
   * @description Returns a sorted copy of the database data. 
   */
  sortData(data: WidgetElement[]): WidgetElement[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'title': [propertyA, propertyB] = [a.title, b.title]; break;
        case 'state': [propertyA, propertyB] = [a.state, b.state]; break;
        case 'url': [propertyA, propertyB] = [a.url, b.url]; break;
        case 'created_at': [propertyA, propertyB] = [a.created_at, b.created_at]; break;
        case 'updated_at': [propertyA, propertyB] = [a.updated_at, b.updated_at]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}

