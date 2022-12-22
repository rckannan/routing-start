import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data } from "@angular/router";

@Component(
  {
    selector : 'app-errorData',
    templateUrl : './error-data-page.component.html'
  }
)
export class errorData implements OnInit{
  errorMessage: string = '';
  
  constructor(private route: ActivatedRoute){}
  ngOnInit(): void {
    this.route.data.subscribe((data: Data)=>{
      this.errorMessage = data['message'];
    });
  }
   
}