import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddContentComponent} from './add-content/add-content.component';
import { ContentDetailsComponent } from './content-details/content-details.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: 'add', component: AddContentComponent},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'details/:id', component: ContentDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],                                                                                                                                                                                                                                                                                                          
  exports: [RouterModule]
})
export class AppRoutingModule { }