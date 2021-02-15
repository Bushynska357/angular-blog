import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../shared/components/admin-layout/interfaces';
import { AuthService } from '../shared/components/admin-layout/services/auth.service';
import { AlertService } from '../shared/components/alert.service';
import { PostsService } from '../shared/components/posts.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts:Post[] =[];
  pSub!:Subscription;
  dSub!:Subscription;
  searchPost='';

  constructor(private auth:AuthService,
      private postsService:PostsService,
      private alert:AlertService
    ) { }

  ngOnInit(): void {
    this.pSub = this.postsService.getAll().subscribe(posts=>{
      this.posts = posts
    })
  }

  // test(){
  //   console.log(this.auth.token)
  // }

  remove(id:any){
    this.dSub = this.postsService.remove(id).subscribe(()=>{
      this.posts = this.posts.filter(post=> post.id != id)
      this.alert.danger('Delete post')
    })
  }


  ngOnDestroy(){
    if(this.pSub){
      this.pSub.unsubscribe()
    }
    if(this.dSub){
      this.dSub.unsubscribe()
    }
  }
}
