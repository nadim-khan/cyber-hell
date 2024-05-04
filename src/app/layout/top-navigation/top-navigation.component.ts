import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AjaxService } from '../../services/ajax.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-top-navigation',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule],
  templateUrl: './top-navigation.component.html',
  styleUrl: './top-navigation.component.scss'
})
export class TopNavigationComponent {
  _userDetails: any;
  mypost:any;
  get userDetails(): boolean {
    return this._userDetails;
  }
  @Input() set userDetails(value: boolean) {
    if(!value || value===undefined || (value && this._userDetails && JSON.stringify(value)===JSON.stringify(this._userDetails))){
      return
    }
    this._userDetails = value;
    this.getAllUserPost();
    this.getAllUserToDo();
  }

  constructor(private apiService:ApiService,
    private ajaxService:AjaxService,){}

  ngOnInit() {
    console.log(this._userDetails)
  }

  getAllUserPost(){
    const {API_CONFIG,API_URLs}=this.apiService;
    const url = `${API_CONFIG.GO_REST_HOST}${API_URLs.getPostsByUser(this._userDetails.id)}`;
    let config = {
      url:url,
      cacheKey:false
    }
    this.ajaxService.getWithCache(config).subscribe((data:any)=>{
      this.mypost =data;
    })
  }

  getAllUserToDo(){

  }
}
