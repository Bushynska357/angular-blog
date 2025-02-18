import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './shared/components/admin-layout/services/auth.service';
import { SharedModule } from './shared/components/admin-layout/shared.module';
import { AuthGuard } from './shared/components/admin-layout/services/auth.guard';
import { SearchPipe } from './shared/components/search.pipe';
import { AlertComponent } from './shared/components/alert/alert.component';
import { AlertService } from './shared/components/alert.service';

@NgModule({
    declarations:[AdminLayoutComponent, DashboardPageComponent, CreatePageComponent, EditPageComponent,LoginPageComponent, SearchPipe, AlertComponent],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild([
            {
                path:'', component: AdminLayoutComponent, children:[
                    { path:'', redirectTo:'/admin/dashboard', pathMatch:'full'},
                    { path:'login', component: LoginPageComponent},
                    {path:'dashboard', component: DashboardPageComponent},
                    {path:'create', component: CreatePageComponent},
                    {path:'post/:id/edit', component: EditPageComponent}
                ]
            }
        ])
    ],
    exports:[RouterModule],
    providers:[AuthService,AuthGuard,AlertService]
})

export class AdminModule{

}