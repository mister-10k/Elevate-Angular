import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../providers/loader.service';

@Component({
  selector: 'app-Loader',
  template: `<div *ngIf="isLoading" id="loader-container">
                <mat-spinner></mat-spinner>
               </div>`,
  styles: ['#loader-container { background-color: rgba(50.2, 50.2, 50.2, 0.5); border: none; cursor: default; height: 100%; left:0;  margin:0;  padding:0;  position: fixed;  top:0; width: 100%; z-index: 999999 }',
           '#loader-container mat-spinner { position: absolute; top: 50%; left: 50%; margin-left: -33px; margin-top: -33px }',
           '#loader-container ::ng-deep .mat-progress-spinner circle, .mat-spinner circle { stroke: #484848; }',
          ]
})
export class LoaderComponent implements OnInit, OnDestroy {

  isLoading: boolean;
  loadingSubscription: Subscription;

  constructor(private loaderService: LoaderService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadingSubscription = this.loaderService.loading$.subscribe(isLoading => {
      this.isLoading = isLoading;
      this.cdRef.detectChanges();
  });
  }

  ngOnDestroy() {
    if (this.loadingSubscription) this.loadingSubscription.unsubscribe();
  }

}
