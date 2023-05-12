import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {

  constructor(private http: HttpClient) { }

  sendMessage(message: string, phoneNumber: string) {
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    return this.http.post(url, null);
  }
}
