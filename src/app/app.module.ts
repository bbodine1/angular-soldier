import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SoldiersComponent } from './components/soldiers/soldiers.component';
import { SoldierDetailComponent } from './components/soldier-detail/soldier-detail.component';
import { SoldierService } from './services/soldier.service';
import { SoldierSearchComponent } from './components/soldier-search/soldier-search.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { MessagesComponent } from './components/messages/messages.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    SoldierDetailComponent,
    SoldiersComponent,
    SoldierSearchComponent,
    TopbarComponent,
    MessagesComponent,
  ],
  providers: [SoldierService],
  bootstrap: [AppComponent],
})
export class AppModule {}
