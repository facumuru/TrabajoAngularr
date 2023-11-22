import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Student } from '../models/student';


@Injectable({
  providedIn: 'root'
})
export class TestServiceService {

              
  private url = 'https://backend-idra-production.up.railway.app/student';

  constructor(private http: HttpClient) { } 

  getAll(): Observable <any> { 
    return this.http.get(this.url + "/getAll") 
  }

  add(s: Student): Observable <any>{ 
    return this.http.post(this.url, s)
  }

  alter(s: Student): Observable <any>{
    return this.http.post(this.url + '/' + s.id + '/update',s)
  }

  delete(id: number): Observable <any>{
    return this.http.post(this.url + '/' + id + '/delete', null)

  }
  
 
  


























  /*
  getById (id : number): Observable<any> {
    return this.http.get(this.url + '/' + id)
  }

  getAll(): Observable<any>{
    return this.http.get(this.url + '/getAll')
  }

  save(Student: any): Observable <any> {
    return this.http.post(this.url , Student )
  }

  update (id: number, student: any ): Observable <any> {
    return this.http.post (this.url + "/"  + id + "/update", student)
  }
   
  delete (id: number, Student: any): Observable <any>{
    return this.http.post(this.url + "/" + id + "delete" , null)
  }
  */
  
}
