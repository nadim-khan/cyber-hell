import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AjaxService } from '../../../services/ajax.service';
import { PaginationComponent } from '../../../components/pagination/pagination.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule,RouterOutlet,PaginationComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  userList:any;
  pageSize:number = 10;
  pageNumber:number = 1;
  startIndex: number=1;
  constructor(
    private apiService:ApiService,
    private ajaxService:AjaxService
  ){}

  ngOnInit(){
    const {API_CONFIG,API_URLs}=this.apiService;
    const url = `${API_CONFIG.GO_REST_HOST}${API_URLs.getAllUsers(this.pageNumber,this.pageSize)}`;
    let config = {
      url:url,
      cacheKey:false
    }
    this.ajaxService.get(config).subscribe((data:any)=>{
      this.userList = data;
    })

    
    
  }

  getAllUsers(){
    const {API_CONFIG,API_URLs}=this.apiService;
    const url = `${API_CONFIG.GO_REST_HOST}${API_URLs.getAllUsers(this.pageNumber,this.pageSize)}`;
    let config = {
      url:url,
      cacheKey:false
    }
    this.ajaxService.get(config).subscribe((data:any)=>{
      this.userList = data;
    })
  }

  onPageClick(event:any){
    this.startIndex = event.startIndex;
      switch(event.action){
        case 'start':{
          this.pageNumber =1;
          break
        }
        case 'previous':{
          if(this.pageNumber >1){
            this.pageNumber =this.pageNumber -1;
          }
          break;
        }
        case 'next':{
          this.pageNumber =this.pageNumber+1;
          break
        }
        case 'end':{
          this.pageNumber =10;
        }
      }
      this.getAllUsers();
  }

}
