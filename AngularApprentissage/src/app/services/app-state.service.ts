import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  public productsState :any={
    products :[],
    keyword: "",
    totalPages:0,
    pageSize:3,
    currentpage:1,
    totalProducts:0,
    status:"",
    errorMessage:""


  }
  constructor() { }
  public setProductState(state :any)
  {
    //...this.productsState copy all data and overwrite state
    //...this.productsState current product status
    //...state the data we want to change
    this.productsState={...this.productsState,...state}
  }
}
