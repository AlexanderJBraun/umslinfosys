import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ProductClass} from '../../../../../models/product';
import {CartService} from '../../services/cart.service';
import {CartEntity} from '../../services/cart.entity';
import {Host} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [CartService]
})
export class HomeComponent implements OnInit {
    products: ProductClass[];


  constructor(
    private authService:AuthService,
    private cartService:CartService
    ) { 
    this.authService.getProduct().subscribe(products => {
      this.products = products;
    });
    }

  ngOnInit() {
  }


//appendItem(products){

  //this.cartService.getCartEntryByProductId(products.name).then(function(cartEntry:CartEntity){
//
  //  this.cartService.addProductToCart(products);
//}.bind(this));
//}





  
}




