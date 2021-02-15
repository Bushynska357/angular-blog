import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../admin/shared/components/admin-layout/interfaces';
import { PostsService } from '../admin/shared/components/posts.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  posts$!:Observable<Post[]> ;

  constructor(private postsService:PostsService) { }

  ngOnInit(): void {
    this.posts$ = this.postsService.getAll()
  }

}
