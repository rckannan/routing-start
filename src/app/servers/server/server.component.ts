import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, NavigationExtras, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent implements OnInit {
  server: { id: number; name: string; status: string };

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router : Router
  ) {}

  ngOnInit() {
    // const parm = +this.route.snapshot.params['id'];
    // this.server = this.serversService.getServer(parm);
    // this.route.params.subscribe((parms: Params) => {
    //   this.server = this.serversService.getServer(+parms['id']);
    //   console.log(parms['id']);
    // });

    this.route.data.subscribe((data : Data)=>{
      this.server = data['server'];
    });
  }

  onEdit(){
    let navigationxtras : NavigationExtras = {queryParams: {'allowEdit' : 1}, fragment: 'loading', relativeTo : this.route};
    this.router.navigate(['edit'], navigationxtras);
  }
}
