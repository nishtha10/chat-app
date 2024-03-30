import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => (import('./auth/login/login.component')).then(m => m.LoginComponent)
    },
    {
        path: 'list',
        loadComponent: () => (import('./pages/chat-list/chat-list.component')).then(m => m.ChatListComponent)
    },
    {
        path: 'chat/:id/:roomId',
        loadComponent: () => (import('./pages/chat-page/chat-page.component')).then(m => m.ChatPageComponent)
    },
    {
        path: '',
        redirectTo: '/login', pathMatch: 'full'
    }
];
