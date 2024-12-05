import { MatInputModule } from '@angular/material/input';
import { Component } from '@angular/core';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { BlogService } from '../shared/services/blog-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';
import { post } from '../shared/dtos/post';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatOptionModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatFabButton,
    ReactiveFormsModule
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  formGroup: FormGroup;

  postId: string | null = null;

  post: post | null = null;


  constructor(private formBuilder: FormBuilder, private blogService: BlogService, private snackBar: MatSnackBar, private route: ActivatedRoute) {
    this.formGroup = this.formBuilder.group({
      title: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
      author: new FormControl(null, [Validators.required]),
      eTag: new FormControl(null, [Validators.required]),
      id: new FormControl(null, [Validators.required]),
    });

    this.route.params.subscribe((params: any) => {
      this.postId = params['id'];
    });

    if (this.postId !== null) {
      this.blogService.getBlogPost(this.postId).subscribe(post => {
        this.post = post;
        this.formGroup.patchValue({
          title: post.title,
          content: post.content,
          author: post.author,
          eTag: post.eTag,
          id: post.id,
        });
      });
    }


  }



  editPost() {
    console.log(this.formGroup.value);
    this.blogService.updateBlogPost(this.formGroup.value).subscribe(
      () => {
        this.snackBar.open('Post updated successfully', 'Close');
        this.formGroup.reset();
      },
      (error) => {
        this.snackBar.open('You are trying to update an outdated version', 'Close');
      }
    );
  }

}
