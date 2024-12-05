import { Component, Inject } from '@angular/core';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BlogService } from '../shared/services/blog-service';
import { post } from '../shared/dtos/post';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-read',
  standalone: true,
  imports: [
    MatCardModule,
    MatButton,
    MatIconModule,
    MatFabButton,
    RouterModule
  ],
  providers: [BlogService],
  templateUrl: './read.component.html',
  styleUrl: './read.component.scss'
})
export class ReadComponent {

  posts: post[] = [];

  constructor(private blogService: BlogService) {

  }

  ngOnInit(): void {
    this.blogService.getBlogPosts().subscribe(posts => {
      this.posts = posts;
    });

    console.log(this.posts);
  }

}
