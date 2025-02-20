import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Voiture } from '../../models/voiture';
import { AppSettings } from '../../settings/app.settings';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  constructor(private http:HttpClient) { }

    findAllVoitures() {
      return this.http.get(AppSettings.APP_URL+"voitures");
    }
  
    saveVoiture(voiture:Voiture) {
      return this.http.post(AppSettings.APP_URL+"voitures", voiture);
    }
}
