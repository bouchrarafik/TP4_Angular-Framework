import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import {finalize, Observable} from 'rxjs';
import {AppStateService} from "./app-state.service";
import {LoadingService} from "./loading.service";

/** Pass untouched request through to the next request handler. */
@Injectable()
export class appHttpInterceptor implements HttpInterceptor {

  //for all request HTTP

  constructor(private appState :AppStateService,private Ls:LoadingService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    // this.appState.setProductState(
    //   {
    //     status:"LOADING"
    //   }
    // )
    this.Ls.showLoadingSpiner();
    let request=req.clone({
      headers : req.headers.set(
        "Authorization","Bearer JWT"
      )
    });

//subscribe pip ecouter la reponse finalize  (que ca soit error ou reponse) avant de retourner la reponse
    return next.handle(request).pipe(
      finalize(()=> {
        //   this.appState.setProductState(
        //     {
        //       status:"LOADED"
        //     }
        //   )
        this.Ls.hideLoadingSpiner();

      })

    );

  }
}
