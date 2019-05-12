import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IVServer } from './IVServer';
import { empty, of } from 'rxjs';

import {delay, debounceTime, find, switchMap} from 'rxjs/internal/operators';
//import { first, tap, filter, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  subject = new Subject<IVServer[]>();
  searchText: string; 
  baseUrl ="api/vservers";
  
  constructor(private http: HttpClient) {
    this.setServers();
       }

  public setServers(): void {
     this.http.get<IVServer[]>(this.baseUrl).pipe(debounceTime(1000)).subscribe(res=>this.subject.next(res));
  }

  public getServers(): Observable<IVServer[]> {
   return  this.subject.asObservable()
  }

  public addServer(): void {
    this.http.post(this.baseUrl, {}).pipe(debounceTime(1000)).subscribe(res => {
      this.setServers();
    },error=>this.handleError(error));
  }
    handleError(error: any): void {
     console.error(error);
    }

  public removeServers(ids: number[],clearFn: Function): void {
    
    let query = '';

    ids.forEach(id => {
      if (!query.length) query = "id=" + id;
      else
        query += ("&id=" + id);
      }
    );
    console.log(query);
    this.http.delete(`${this.baseUrl}?${query}`).pipe(debounceTime(1000)).subscribe(res => {
    
      this.setServers();
      clearFn();
    }, error => this.handleError(error));
  }


}
