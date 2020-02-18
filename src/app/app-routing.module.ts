import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsComponent } from './details/details.component';
import { WidgetComponent } from './widget/widget.component';
import { AppComponent } from  './app.component';
import { importType } from '@angular/compiler/src/output/output_ast';

const routes: Routes = [
  {
    path:'',
    component: WidgetComponent
  },
  {
    path:'details',
    component: DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
