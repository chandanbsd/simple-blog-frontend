import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { post } from '../dtos/post';
import { postPayload } from '../payloads/post-dto';
import { postVersion } from '../dtos/post-version';
// Assuming you have a post model

@Injectable({
    providedIn: 'root'
})
export class BlogService {
    private apiUrl = 'https://localhost:44358/api/Blog';

    static httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    constructor(private http: HttpClient) { }

    private handleError(error: HttpErrorResponse) {

        console.error('An error occurred:', error.message);
        return throwError('Something bad happened; please try again later.');
    }

    getBlogPosts(): Observable<post[]> {
        return this.http.get<post[]>(this.apiUrl, BlogService.httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    getAuditBlogPosts(postId: string): Observable<postVersion[]> {
        const url = `${this.apiUrl}/Audit/${postId}`;
        return this.http.get<postVersion[]>(url, BlogService.httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    getBlogPost(id: string): Observable<post> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<post>(url);
    }

    addBlogPost(postPayload: postPayload): Observable<boolean> {
        const url = `${this.apiUrl}`;
        return this.http.post<boolean>(url, postPayload, BlogService.httpOptions);
    }

    updateBlogPost(post: post): Observable<boolean> {
        const url = `${this.apiUrl}`;

        return this.http.put<boolean>(url, post, BlogService.httpOptions);
    }

    deleteBlogPost(id: number): Observable<{}> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete(url);
    }
}
