import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Post } from '../admin/shared/components/admin-layout/interfaces';
import { PostsService } from '../admin/shared/components/posts.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {

  post$!:Observable<Post>

  constructor(private route:ActivatedRoute,
      private postsService:PostsService
    ) { }

  ngOnInit(): void {
    this.post$ = this.route.params
    .pipe(switchMap((params:Params) => {
        return this.postsService.getById(params['id'])
    }))
  }

}
