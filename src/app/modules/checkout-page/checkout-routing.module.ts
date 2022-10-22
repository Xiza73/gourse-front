import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoggedInGuard } from 'src/app/core/guards/user-logged-in.guard';
import { CheckoutPageComponent } from './checkout-page.component';


const routes: Routes = [
  {
    path: 'pag',
    component: CheckoutPageComponent,
    canActivate: [UserLoggedInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
