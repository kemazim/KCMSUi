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
import { AuthGuard } from "./guard/auth.guard";

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
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'reportingISST',
        component: ReportingISSTComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'myProfile',
        component: MyProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'contactUs',
        component: ContactUsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'addUser',
        component: AddUserComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'deleteUser',
        component: DeleteUserComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'emailService',
        component: EmailServiceComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'emailRecipient',
        component: EmailRecipientComponent,
        canActivate: [AuthGuard]
    }
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }