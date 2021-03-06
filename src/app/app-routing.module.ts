import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { CrudComponent } from './pages/crud/crud.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { NewCustomerComponent } from './pages/new-customer/new-customer.component';
import { OrderComponent } from './pages/order/order.component';
import { NewProductComponent } from './pages/new-product/new-product.component';
import { NewProductV2Component } from './pages/new-product-v2/new-product-v2.component';
import { LocaleComponent } from './pages/locale/locale.component';

const routes: Routes = [
  {
    path: 'locale',
    component: LocaleComponent
  },
  {
    path: 'product-v2',
    component: NewProductV2Component,
    canActivate: [AuthGuardService]
  },
  {
    path: 'product',
    component: NewProductComponent,
    canActivate: [AuthGuardService]
  },
  { 
    path: 'order',
    component: OrderComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'new-customer',
    component: NewCustomerComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'new-user',
    component: NewUserComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'crud',
    component: CrudComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), DxDataGridModule, DxFormModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    ProfileComponent,
    TasksComponent
  ]
})
export class AppRoutingModule { }
