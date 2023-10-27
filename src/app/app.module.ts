import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReportingISSTComponent } from './components/reporting-isst/reporting-isst.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AddUserComponent } from './components/add-user/add-user.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { HeaderComponent } from './components/header/header.component';
import { EmailServiceComponent } from './components/email-service/email-service.component';
import { EmailRecipientComponent } from './components/email-recipient/email-recipient.component'
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    DashboardComponent,
    ReportingISSTComponent,
    MyProfileComponent,
    SettingsComponent,
    ContactUsComponent,
    AddUserComponent,
    DeleteUserComponent,
    HeaderComponent,
    EmailServiceComponent,
    EmailRecipientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
