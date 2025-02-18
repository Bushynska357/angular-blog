import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { from } from 'rxjs';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import {AdminModule} from './admin/admin.module'
import { AdminLayoutComponent } from './admin/shared/components/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path:'', component: MainLayoutComponent, children:[
      {path:'', redirectTo: '/', pathMatch:'full'},
      {path:'', component: HomePageComponent},
      {path:'post/:id', component: PostPageComponent}
    ]
  },
  {
    path:'admin', loadChildren:'./admin/admin.module#AdminModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy:PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


