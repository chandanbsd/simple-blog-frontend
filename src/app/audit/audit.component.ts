import { Component, Inject } from '@angular/core';
import { MatButton, MatFabButton } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BlogService } from '../shared/services/blog-service';
import { post } from '../shared/dtos/post';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { postVersion } from '../shared/dtos/post-version';

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
  templateUrl: './audit.component.html',
  styleUrl: './audit.component.scss'
})
export class AuditComponent {

  posts: postVersion[] = [];

  constructor(private blogService: BlogService, private router: ActivatedRoute) {
    router.params.subscribe((params: any) => {
      this.blogService.getAuditBlogPosts(params['id']).subscribe(post => {
        this.posts = post;
      });
    });

  }


}
