import { Injectable, OnInit } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ServersService } from "./servers.service";

interface server{
    id : number;
    name : string;
    status : string;
}

@Injectable()
export class serverResolver implements Resolve<server> {
    constructor(private serverService : ServersService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): server | Observable<server> | Promise<server> {
       return this.serverService.getServer(+route.params['id']);
    }
     
}
