import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AddRecordComponent } from './components/add-record/add-record.component';
import { SearchRecordComponent } from './components/search-record/search-record.component';
import { DeleteRecordComponent } from './components/delete-record/delete-record.component';
import { ReportingComponent } from './components/reporting/reporting.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    DashboardComponent,
    HeaderComponent,
    SpinnerComponent,
    AddRecordComponent,
    SearchRecordComponent,
    DeleteRecordComponent,
    ReportingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
