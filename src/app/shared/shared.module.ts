import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RemoveDialog } from './components/remove-dialog/remove-dialog.component';
import { MatDialogRef, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { LoaderComponent } from './components/Loader/loader.component';



@NgModule({
  entryComponents: [
    RemoveDialog
  ],
  declarations: [
    NavbarComponent,
    FooterComponent,
    RemoveDialog,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    RemoveDialog,
    LoaderComponent
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
  ],
})
export class SharedModule { }
