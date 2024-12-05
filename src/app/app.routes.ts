import { Routes } from '@angular/router';
import { ReadComponent } from './read/read.component';
import { PostComponent } from './post/post.component';
import { EditComponent } from './edit/edit.component';
import { AuditComponent } from './audit/audit.component';

export const routes: Routes = [
    {
        path: '',
        component: ReadComponent
    },

    {
        path: 'read',
        component: ReadComponent
    },

    {
        path: 'post',
        component: PostComponent
    },

    {
        path: 'edit/:id',
        component: EditComponent
    },

    {
        path: 'audit/:id',
        component: AuditComponent
    }
];
