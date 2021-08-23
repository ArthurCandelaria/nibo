import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClashesComponent } from './components/clashes/clashes.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'clashes', component: ClashesComponent },
  { path: '**', component: ErrorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
