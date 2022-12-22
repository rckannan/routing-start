import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { notfoundComponent } from './not-found/not-found.component';
import { NgModule } from '@angular/core';
import { authGuard } from './auth-guard.service';
import { canDeactivateGaurd } from './servers/edit-server/can-deactivate-gaurd.service';
import { errorData } from './error-data-page/error-data-page.component';
import { serverResolver } from './servers/serverResolver.service';
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'user',
    component: UsersComponent,
    children: [{ path: ':id/:name', component: UserComponent }],
  },

  {
    path: 'servers',
    component: ServersComponent,
    resolve: { server: serverResolver },
    // canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: ':id', component: ServerComponent },
      {
        path: ':id/edit',
        component: EditServerComponent,
        canDeactivate: [canDeactivateGaurd],
      },
    ],
  },
  // { path: 'not-found', component: notfoundComponent },
  {
    path: 'not-found',
    component: errorData,
    data: { message: 'page not found!!!' },
  },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule],
})
export class appRouteModule {}
