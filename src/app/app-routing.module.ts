import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AuthGuard } from "./guard/auth.guard";
import { AddRecordComponent } from "./components/add-record/add-record.component";
import { SearchRecordComponent } from "./components/search-record/search-record.component";
import { DeleteRecordComponent } from "./components/delete-record/delete-record.component";
import { ReportingComponent } from "./components/reporting/reporting.component";

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
        path: 'addRecord',
        component: AddRecordComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'searchRecord',
        component: SearchRecordComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'deleteRecord',
        component: DeleteRecordComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'reporting',
        component: ReportingComponent,
        canActivate: [AuthGuard]
    }
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }