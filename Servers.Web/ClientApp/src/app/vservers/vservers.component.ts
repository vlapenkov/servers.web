import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { IVServer } from '../services/IVServer';

@Component({
  selector: 'v-servers',
  templateUrl: './vservers.component.html',
})
export class VServersComponent  implements OnInit {

  serverIds:Array<number>=[];
  data$: Observable<IVServer[]>;
  constructor(private service: ApiService) { }


  ngOnInit() {
    this.data$ = this.service.getServers();

     }

  addServer():void {
    this.service.addServer();
  }

  removeServers() {
    this.service.removeServers(this.serverIds, this.clearIds.bind(this) );
  }

  clearIds() {
    this.serverIds = [];
  }

  selectForRemove(id:number): void {
//    this.service.removeServer(id);
    var index = this.serverIds.indexOf(id);

    if (index === -1) {
      this.serverIds.push(id);
    } else {
      this.serverIds.splice(index, 1);
    }
  
  }



}
