export class Vehicule {
    matricule:number;
    anneeModel:number;
    prix:number;
    imageVehicule:string;
    descriptif:string;
    stockQty:number;

    constructor(matricule:number, anneeModel:number, prix:number, imageVehicule:string, descriptif:string, stockQty:number) {
        this.matricule = matricule;
        this.anneeModel = anneeModel;
        this.prix = prix;
        this.imageVehicule = imageVehicule;
        this.descriptif = descriptif;
        this.stockQty = stockQty;
    }
}
