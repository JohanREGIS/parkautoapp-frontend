import { Vehicule } from "./vehicule";

export class Voiture extends Vehicule {
    nbPorte:number;
    poidsTotal:number;
    categorie:string;
    immatriculation:string;
    media:string;

    constructor(matricule:number, anneeModel:number, prix:number, imageVehicule:string, descriptif:string, stockQty:number, nbPorte:number, poidsTotal:number, categorie:string, immatriculation:string, media:string) {
        super(matricule, anneeModel, prix, imageVehicule, descriptif, stockQty);
        this.nbPorte = nbPorte;
        this.poidsTotal = poidsTotal;
        this.categorie = categorie;
        this.immatriculation = immatriculation;
        this.media = media;
    }
}
