import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEvent, HttpSentEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public apiUrl = 'http://localhost:8080'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  public callPostService(url: any, param: any): Observable<HttpEvent<any>> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(url, JSON.stringify(param), { headers: httpHeaders });
  }
  public callGetService(url: any): Observable<HttpEvent<any>> {
    return this.http.get<any>(url);
  }
  public callDeleteService(url: any): Observable<HttpEvent<any>> {
    return this.http.delete<any>(url);
  }
}
