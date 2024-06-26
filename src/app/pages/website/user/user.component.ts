import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AjaxService } from '../../../services/ajax.service';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { AuthService } from '../../../services/auth.service';

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
    private ajaxService:AjaxService,
    private authService:AuthService
  ){}

  ngOnInit(){
   this.getAllUsers();
    
    
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

  setUser(user:any){
    this.authService.loggedInUser = user;
  }

}
