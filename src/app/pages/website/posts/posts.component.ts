import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { AjaxService } from '../../../services/ajax.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { PaginationComponent } from '../../../components/pagination/pagination.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule,RouterOutlet,PaginationComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {
  postList:any;
  pageSize:number = 100;
  pageNumber:number = 1;
  startIndex: number=1;
  postId: any;
  myPost:any;
  constructor(
    private apiService:ApiService,
    private ajaxService:AjaxService,
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    
    this.route.params.subscribe(params => {
      this.postId = params['id']; 
      this.getAllUserPost()
    });

    if(!this.postId){
      this.getAllPosts()
    }
    
  }

  getAllPosts(){
    const {API_CONFIG,API_URLs}=this.apiService;
    const url = `${API_CONFIG.GO_REST_HOST}${API_URLs.getAllPosts(this.pageNumber,this.pageSize)}`;
    let config = {
      url:url,
      cacheKey:false
    }
    this.ajaxService.get(config).subscribe((data:any)=>{
      this.postList = data;
    })
  }

  getAllUserPost(){
    const {API_CONFIG,API_URLs}=this.apiService;
    const url = `${API_CONFIG.GO_REST_HOST}${API_URLs.getPostsByUser(this.postId)}`;
    let config = {
      url:url,
      cacheKey:false
    }
    this.ajaxService.getWithCache(config).subscribe((data:any)=>{
      this.postList =data;
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
      this.getAllPosts();
  }
}
