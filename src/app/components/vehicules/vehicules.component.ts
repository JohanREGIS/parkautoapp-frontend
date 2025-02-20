import { Component, OnInit } from '@angular/core';
import { VehiculeService } from '../../services/vehicule/vehicule.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-vehicules',
  standalone: false,
  
  templateUrl: './vehicules.component.html',
  styleUrl: './vehicules.component.css'
})
export class VehiculesComponent implements OnInit {
  vehicules: any;

  constructor(private vehiculeService: VehiculeService, private cartService: CartService, private router: Router) {

  }

  ngOnInit(): void {
    this.getVehicules();
  }

  getVehicules() {
    this.vehiculeService.findAllVehicules().subscribe(
      data => {
        console.log(data);
        this.vehicules = data;
      }
    );
  }

  actionAddToCart(item:any) {
    this.cartService.addToCart(item);
  }

}
