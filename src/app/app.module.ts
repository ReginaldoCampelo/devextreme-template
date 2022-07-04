// angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// devextreme imports
import { DxButtonModule, DxLoadPanelModule, DxPopupModule, DxTextBoxModule, DxValidationSummaryModule, DxValidatorModule } from 'devextreme-angular';
import { DxLookupModule } from 'devextreme-angular';
import { DxTemplateModule } from 'devextreme-angular';
import { DxSpeedDialActionModule } from 'devextreme-angular';
import { DxCheckBoxModule } from 'devextreme-angular';
import { DxFormModule } from 'devextreme-angular';
import { DxSelectBoxModule } from 'devextreme-angular';
import { DxToastModule } from 'devextreme-angular';
import { DxPieChartModule } from 'devextreme-angular';
import { DxDataGridModule } from 'devextreme-angular';
import { DxDateBoxModule } from 'devextreme-angular';
import { DxDropDownBoxModule } from 'devextreme-angular';
import { DxResponsiveBoxModule } from 'devextreme-angular';
import { DxTreeViewModule } from 'devextreme-angular';
import { DxDrawerModule } from 'devextreme-angular';
import { DxScrollViewModule } from 'devextreme-angular';
import { DxToolbarModule } from "devextreme-angular";

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { CrudComponent } from './pages/crud/crud.component';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { NewCustomerComponent } from './pages/new-customer/new-customer.component';
import { OrderComponent } from './pages/order/order.component';
import { NewProductComponent } from './pages/new-product/new-product.component';
import { NewProductV2Component } from './pages/new-product-v2/new-product-v2.component';
import { LocaleComponent } from './pages/locale/locale.component';
import { LocaleService } from './pages/locale/shared/services/locale.service';


const ANGULAR_IMPORTS = [
  CommonModule,
  BrowserModule,
  BrowserAnimationsModule,
  RouterModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule
];

const DEV_EXTREME_IMPORTS = [
  DxButtonModule,
  DxToolbarModule,
  DxDrawerModule,
  DxScrollViewModule,
  DxDrawerModule,
  DxTreeViewModule,
  DxResponsiveBoxModule,
  DxDropDownBoxModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxPieChartModule,
  DxSelectBoxModule,
  DxCheckBoxModule,
  DxToastModule,
  DxFormModule,
  DxSpeedDialActionModule,
  DxDataGridModule,
  DxTemplateModule,
  DxLookupModule,
  DxLoadPanelModule,
  DxPopupModule ,
  DxValidatorModule,
  DxValidationSummaryModule,
  DxTextBoxModule
];

@NgModule({
  declarations: [
    AppComponent,
    CrudComponent,
    NewUserComponent,
    NewCustomerComponent,
    OrderComponent,
    NewProductComponent,
    NewProductV2Component,
    LocaleComponent
  ],
  imports: [
    DEV_EXTREME_IMPORTS,
    ANGULAR_IMPORTS,
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService,
    LocaleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
