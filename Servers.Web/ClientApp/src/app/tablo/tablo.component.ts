import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer,interval, Subscription } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { switchMap } from 'rxjs/internal/operators';

@Component({
  selector: 'app-tablo',
  templateUrl: './tablo.component.html',
})
export class TabloComponent implements OnInit, OnDestroy {
    
  
  dateOnServer: Date = new Date();
  timeOfFirstActiveServer: string = null;
  subscription : Subscription;
  constructor(private http: HttpClient) {  }

    ngOnInit(): void {
      this.subscription=   timer(0, 1000).pipe(switchMap(x => this.http.get("api/tablo")))
        .subscribe((response: any) => {

          console.log(response);
          this.dateOnServer = response.curDate;
          this.timeOfFirstActiveServer = response.howLong;
        });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
