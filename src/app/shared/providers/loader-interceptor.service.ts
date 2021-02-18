import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptor {
   private totalRequests = 0;

    constructor(public loaderService: LoaderService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.skipRoute(req.url)) {
          this.totalRequests++;
          this.loaderService.show();
        }
        
        return next.handle(req).pipe(
            finalize(() => {
              if (!this.skipRoute(req.url))
                this.decreaseRequests()
            })
        );
    }

    private decreaseRequests() {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          setTimeout(() => {  this.loaderService.hide(); }, 300);
        }
    }

    private skipRoute(url:string): boolean {
      if (url.toUpperCase().endsWith('USER/USERALREADYHASEMAIL')) {
        return true;
      }
      return false;
    }
}
