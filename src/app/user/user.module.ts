import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignUpDialog } from './components/sign-up/sign-up-dialog.component';
import { MaterialModule } from '../shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';



@NgModule({
  entryComponents: [SignUpDialog],
  declarations: [HomeComponent, LoginComponent, SignUpDialog],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [LoginComponent,SignUpDialog,HomeComponent]
})
export class UserModule { }
