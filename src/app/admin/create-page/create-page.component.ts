import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../shared/components/admin-layout/interfaces';
import { AlertService } from '../shared/components/alert.service';
import { PostsService } from '../shared/components/posts.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit {

  form!:FormGroup;

  constructor(private postService:PostsService,
      private alert:AlertService
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null,
        Validators.required
      ),
      text: new FormControl(null,
        Validators.required
      ),
      author: new FormControl(null,
        Validators.required
      )
    }) 
  }

  submit(){
    if(this.form.invalid){
      return
    }
    const post:Post={
      title:this.form.value.title,
      text:this.form.value.text,
      author:this.form.value.author,
      date:new Date()
    }
    this.postService.create(post).subscribe(()=>{
      this.form.reset()
      this.alert.success('Done')
    })
    console.log(post)
  }

}
