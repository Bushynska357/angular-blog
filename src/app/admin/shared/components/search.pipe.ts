import { Pipe, PipeTransform } from "@angular/core";
import { Post } from "./admin-layout/interfaces";

@Pipe({
    name:'search'
})

export class SearchPipe implements PipeTransform{
    transform(posts: Post[], search = ''):Post[] {
        // throw new Error("Method not implemented.");
        if(!search.trim){
            return posts
        }
        return posts.filter(post=>{
            return post.title.toLowerCase().includes(search.toLowerCase())
                    // return JSON.stringify(post).toLowerCase().includes(search.toLowerCase())
                  
        })
        }
      

}