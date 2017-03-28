import {ProductClass} from '../../../../models/product';
import {Injectable} from '@angular/core';
import {CartEntity} from './cart.entity';

@Injectable()
export class CartService{

    private _storage = localStorage;

    constructor(){
        this.initCart();
    }

    initCart(){
        // if we dont have  any cart history, create a empty cart
        if(!this._storage.getItem('cart')){

            let emptyMap: { [key:string]:number;} = {};
            this.setCart(emptyMap);
        }
    }

  
  //Will persist the product to local storage

  addProductToCart(product: ProductClass) : void{
      // product id , quantity
      let cartMap = this.getCart();

        // if the current key exists in the map , append value
        if(cartMap[product.name] != undefined) {

            let cartInstance = cartMap[product.name];
            cartInstance.quantity++;
            cartMap[product.name] = cartInstance;

        } else {
          // if not, set default value
          cartMap[product.name] = {
            'product':product,
            'quantity':1
          }
        }
      // save the map
      this.setCart(cartMap);
      console.log(this._storage);

  }


  getCartEntryByProductId(productname){

      let myCartMap = this.getCart;
      console.log(myCartMap);
      //return Promise.resolve(myCartMap[productname]);
  }

  
   //Retrive the cart from local storage
  
  private getCart() {

     let cartAsString = this._storage.getItem('cart');
     return JSON.parse(cartAsString);

  }




      private setCart(cartMap) : void{

      this._storage.setItem('cart',JSON.stringify(cartMap));
  }

}