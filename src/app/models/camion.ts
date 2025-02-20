import { Vehicule } from "./vehicule";

export class Camion extends Vehicule {
    hauteur:string;

    constructor(matricule:number, anneeModel:number, prix:number, imageVehicule:string, descriptif:string, hauteur:string) {
        super(matricule, anneeModel, prix, imageVehicule, descriptif);
        this.hauteur = hauteur;
    }
}
