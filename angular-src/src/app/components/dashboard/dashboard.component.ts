import { Component, OnInit, Injectable } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {ProductClass} from '../../../../../models/Product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {    
    name: string;
    itemDescription: String;
    price: Number;
    inStock: Number;
    displayDialog: boolean;
    product: ProductClass = new PrimeProduct();
    selectedProduct: ProductClass;
    plusProduct: boolean;
    products: ProductClass[];

  constructor(    
    private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router) { }

  ngOnInit() {
        this.authService.getProduct().subscribe(products => {
      this.products = products;
    });
  }

      addProduct(){
        var newProduct = {
          name: this.name,
          description: this.itemDescription,
          price: this.price,
          inStock: this.inStock
        }
        
        this.authService.addProduct(newProduct)
            .subscribe(product => {
                this.products.push(product);
                this.name = '';
                this.itemDescription = '';
                this.price = null;
                this.inStock = null;
            });

    }

    deleteProduct(id){
      var products = this.products;

      this.authService.deleteProduct(id).subscribe(data => {
        if(data.n == 1){
           for(var i = 0;i < products.length;i++){
            if(products[i]._id == id){
              products.splice(i,1);
            }
          }
        }
      });
    }

    showDialogToAdd(){
      this.plusProduct = true;
      this.product = new PrimeProduct();
      this.displayDialog = true;
    }

    save(){
      var products = products;
      if(this.plusProduct)
        this.authService.addProduct(this.product)
            .subscribe(product => {
                this.products.push(product);
                this.name = '';
                this.itemDescription = '';
                this.price = null;
                this.inStock = null;
            });
      else 
        this.authService.save(this.product);
        
      this.product=null;
      this.displayDialog=false;
    }

    delete(id){
      var products = this.products;

      this.authService.deleteProduct(id).subscribe(data => {
        if(data.n == 1){
           for(var i = 0;i < products.length;i++){
            if(products[i]._id == id){
              products.splice(i,1);
            }
          }
        }
      });
      this.product=null;
      this.displayDialog=false;
    }

    onRowSelect(event){
      this.plusProduct = false;
      this.product = this.cloneProduct(event.data);
      this.displayDialog=true;
    }

    cloneProduct(p: ProductClass): ProductClass{
      let product = new PrimeProduct();
      for(let prop in p){
        product[prop] = p[prop];
      }
      return product;
    }

    findSelectedProductIndex(): number{
      return this.products.indexOf(this.selectedProduct);
    }
    



}

class PrimeProduct implements ProductClass {
  _id: string
  name: string
  itemDescription: string
  price: number
  inStock: number


}