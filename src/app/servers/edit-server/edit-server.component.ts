import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ServersService } from '../servers.service';
import { canComponentDeactivate, canDeactivateGaurd } from './can-deactivate-gaurd.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css'],
})
export class EditServerComponent implements OnInit, canDeactivateGaurd {
  server: { id: number; name: string; status: string };
  serverName = '';
  serverStatus = '';
  hasSaved: boolean = false;
  allowEdit : boolean = false;

  constructor(private serversService: ServersService, private router : Router, private route : ActivatedRoute) {}
  canDeactivate(component: canComponentDeactivate, currentRoute: ActivatedRouteSnapshot, 
    currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
    if(!this.allowEdit){
      return true;
    }
    
    if((!this.hasSaved) && (this.server.name !== this.serverName)){
      return confirm("do you need to proceed?");
    }
    else{return true;}
  }

  ngOnInit() {
     
    this.route.params.subscribe((params : Params)=>{
      this.server = this.serversService.getServer(+params['id']);
    });
    this.server = this.serversService.getServer(+this.route.snapshot.params['id']);

    this.allowEdit = this.route.snapshot.queryParams['allowEdit'] === '1'? true: false;
    this.route.queryParams.subscribe((params : Params)=>{
      this.allowEdit = params['allowEdit'] === '1'? true: false;
    });

    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
    this.hasSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
