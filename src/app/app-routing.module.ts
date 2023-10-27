import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ReportingISSTComponent } from "./components/reporting-isst/reporting-isst.component";
import { MyProfileComponent } from "./components/my-profile/my-profile.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { ContactUsComponent } from "./components/contact-us/contact-us.component";
import { AddUserComponent } from "./components/add-user/add-user.component";
import { DeleteUserComponent } from "./components/delete-user/delete-user.component";
import { EmailServiceComponent } from "./components/email-service/email-service.component";
import { EmailRecipientComponent } from "./components/email-recipient/email-recipient.component";

const routes: Routes = [
    {
        path: '',
        component: MainPageComponent
    },
    {
        path: 'mainPage',
        component: MainPageComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'reportingISST',
        component: ReportingISSTComponent
    },
    {
        path: 'myProfile',
        component: MyProfileComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: 'contactUs',
        component: ContactUsComponent
    },
    {
        path: 'addUser',
        component: AddUserComponent
    },
    {
        path: 'deleteUser',
        component: DeleteUserComponent
    },
    {
        path: 'emailService',
        component: EmailServiceComponent
    },
    {
        path: 'emailRecipient',
        component: EmailRecipientComponent
    }
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }