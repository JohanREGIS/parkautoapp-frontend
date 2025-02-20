import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Vehicule } from '../../models/vehicule';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any = [];
  public vehiculeList = new BehaviorSubject<any>([]);
  public grandTotal : number = 0;
  public totalAmount : number = 0;

  constructor() { }

  getVehicules() {
    return this.vehiculeList.asObservable();
  }

  setVehicules(vehicule : any) {
    this.cartItemList.push(...vehicule); // Les 3 trois signifie que chaque véhicule est ajouté à la suite dans le tableau
    this.vehiculeList.next(vehicule);
  }

  addToCart(vehicule : any){
    this.cartItemList.push(vehicule);
    this.vehiculeList.next(this.cartItemList);
    this.getTotal();
    console.log(this.cartItemList);
    console.log(this.getTotal());
  }

  getQuantity():number {
    let quantity = 1;
    return quantity;
  }

  getTotal() {
    let total = 0;

    for(let i = 0; i < this.cartItemList.length; i++) {
      if(this.cartItemList[i].prix) {
        total += this.cartItemList[i].prix;  
      }
    }
    return this.totalAmount = total;
  }

  removeAllCart() {
    this.cartItemList = []; // Crée un tableau vide pour le vider
    this.vehiculeList.next(this.cartItemList); // Et ajouter ce tableau vide à la liste de véhicules
  }

  inc(vehicule:Vehicule) {
    for(let i in this.cartItemList) {
      if(this.cartItemList[i].matricule == vehicule.matricule) { // 3 = permet de vérifier la valeur 'et' le type des deux variables
        this.cartItemList[i].quantity++;
        break;
      }
    }
  }

  removeCartItem(vehicule:any) {
    this.cartItemList.map(
      (a:any, index:any) => {
        if(vehicule.matricule === a.matricule) {
          this.cartItemList.slice(index,1);
        }
      }
    );
    this.vehiculeList.next(this.cartItemList);
  }

  getTotalPrice():number {
    let grandTotal = 0;
    this.cartItemList.map(
      (a:any) => {
        grandTotal += a.total;
      }
    );
    return grandTotal;
  }
}
