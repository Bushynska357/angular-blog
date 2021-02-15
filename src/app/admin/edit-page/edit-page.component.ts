import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Post } from '../shared/components/admin-layout/interfaces';
import { PostsService } from '../shared/components/posts.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {

  form!:FormGroup;
  post!:Post;
  submitted=false;

  constructor(private route:ActivatedRoute,
    private postsService:PostsService
    ) { }

  ngOnInit() {
    this.route.params.pipe(switchMap((params:Params) => {
      return this.postsService.getById(params['id'])
    })).subscribe((post:Post) => {
      this.post = post
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text:new FormControl(post.text, Validators.required)
      })
    })
  }

  submit(){
    if(this.form.invalid){
      return
    }
    this.submitted = true
    this.postsService.update({
      ...this.post,
      title:this.form.value.title,
      text:this.form.value.text
    }).subscribe(() =>{
      this.submitted = true
    })
    
  }
}
