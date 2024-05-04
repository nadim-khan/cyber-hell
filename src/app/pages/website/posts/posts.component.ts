import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { AjaxService } from '../../../services/ajax.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule,RouterOutlet,PaginationComponent,FormsModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {
  postList:any;
  pageSize:number = 100;
  pageNumber:number = 1;
  startIndex: number=1;
  userId: any;
  myPost:any;
  activePostIndex: any;
  activePostid:any;
  commentListOnPost: any;
  currentComments = '';
  constructor(
    private apiService:ApiService,
    private ajaxService:AjaxService,
    private route: ActivatedRoute,
    private authService:AuthService,
    private toastr:ToastrService
  ){}

  ngOnInit(){
    
    this.route.params.subscribe(params => {
      this.userId = params['id']; 
      this.getAllUserPost()
    });

    if(!this.userId){
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
    const url = `${API_CONFIG.GO_REST_HOST}${API_URLs.getPostsByUser(this.userId)}`;
    let config = {
      url:url,
      cacheKey:false
    }
    this.ajaxService.getWithCache(config).subscribe((data:any)=>{
      this.postList =data;
    })
  }

  showComments(index:number,postData:any){
    this.activePostIndex = index;
    this.activePostid = postData.id;
    this.getCommentsByPostId(this.activePostid)
  }

  hideComments(){
    this.activePostIndex = null;
    this.activePostid = null;
  }

  getCommentsByPostId(postId:number){
    
    const {API_CONFIG,API_URLs}=this.apiService;
    const url = `${API_CONFIG.GO_REST_HOST}${API_URLs.getCommentsByPostId(postId)}`;
    let config = {
      url:url,
      cacheKey:false
    }
    this.ajaxService.getWithCache(config).subscribe((data:any)=>{
      this.commentListOnPost =data;
    })

  }

  sendComment(post:any){
    let payload = {
        "post_id": post.id,
        "name": this.authService.getUserInfo().name,
        "email":this.authService.getUserInfo().email,
        "body": this.currentComments
    }
    const {API_CONFIG,API_URLs}=this.apiService;
    const url = `${API_CONFIG.GO_REST_HOST}${API_URLs.getCommentsByPostId(post.id)}`;
    let config = {
      url:url,
      data:payload,
      cacheKey:false
    }
    this.ajaxService.post(config).subscribe((data:any)=>{
      this.currentComments = '';
      this.toastr.success('Comment has been sent successfully','Commented',{
        toastClass:'success-toast'
      })
      this.getCommentsByPostId(post.id);
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

  getShortName(name:string){
    let updatedName = name;
    let array = updatedName.split(' ');
    updatedName = array.length==1?array[0].slice(0,2):(array[0].slice(0,1)+array[1].slice(0,1));
    return updatedName.toUpperCase();
  }

  deleteComment(comment:any){
    
    const {API_CONFIG,API_URLs}=this.apiService;
    const url = `${API_CONFIG.GO_REST_HOST}${API_URLs.deleteCommentById(comment.id)}`;
    let config = {
      url:url,
      cacheKey:false
    }
    this.ajaxService.delete(config).subscribe((data:any)=>{
      this.toastr.success('Post has been deteted successfully','Commented',{
        toastClass:'success-toast'
      })
      this.getCommentsByPostId(this.activePostid)
    })
  }

  deletePost(post:any){
    const {API_CONFIG,API_URLs}=this.apiService;
    const url = `${API_CONFIG.GO_REST_HOST}${API_URLs.deletePostById(post.id)}`;
    let config = {
      url:url,
      cacheKey:false
    }
    this.ajaxService.delete(config).subscribe((data:any)=>{
      this.toastr.success('Comment has been deleted successfully','Commented',{
        toastClass:'success-toast'
      })
      this.getAllUserPost()
    })
  }
}
