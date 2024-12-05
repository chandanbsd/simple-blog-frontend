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
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private blogService: BlogService, private snackBar: MatSnackBar) {
    this.formGroup = this.formBuilder.group({
      title: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
      author: new FormControl(null, [Validators.required]),
    });
  }

  addPost() {
    console.log(this.formGroup.value);
    this.blogService.addBlogPost(this.formGroup.value).subscribe(() => {
      this.snackBar.open('Post added successfully', 'Close');
      this.formGroup.reset();
    });
  }

}
