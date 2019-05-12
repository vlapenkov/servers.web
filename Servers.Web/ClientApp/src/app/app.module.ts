import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AppComponent } from './app.component';
import { VServersComponent } from './vservers/vservers.component';
import { TabloComponent } from './tablo/tablo.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
 
    VServersComponent,
    TabloComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: VServersComponent, pathMatch: 'full' },
    
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
