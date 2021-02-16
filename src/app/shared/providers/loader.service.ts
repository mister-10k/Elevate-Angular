import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isLoading = new BehaviorSubject<boolean>(false);

  get loading$(): Observable<boolean> {
      return this.isLoading.asObservable();
  }

  show() {
      this.isLoading.next(true);
  }
  hide() {
      this.isLoading.next(false);
  }
}
