import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  
  public totalItem : number = 0;

  constructor(private cartService : CartService) {

  }

  ngOnInit(): void {
    this.cartService.getVehicules().subscribe(
      data => {
        console.log(data);
        this.totalItem = data.length;
      }
    );
  }

}
