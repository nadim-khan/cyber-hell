import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../utils/constants/constant';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { 
  }

  getAllCategory(){
    return this.http.get(Constants.ECART_URL+Constants.ECART_METHODS.GET_ALL_CATEGORY);
  }

  getAllProducts(){
    return this.http.get(Constants.ECART_URL+Constants.ECART_METHODS.GET_ALL_PRODUCTS);
  }

  createProduct(body:any){
    return this.http.post(Constants.ECART_URL+Constants.ECART_METHODS.CREATE_PRODUCT,body);
  }

  updateProduct(body:any){
    return this.http.post(Constants.ECART_URL+Constants.ECART_METHODS.UPDATE_PRODUCT,body);
  }

  deleteProductByID(id:any){
    return this.http.get(Constants.ECART_URL+Constants.ECART_METHODS.DELETE_PRODUCT_BY_ID+`?id=${id}`);
  }
}
