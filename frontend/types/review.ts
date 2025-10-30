import { User } from './auth';

export interface Journal {
    id: number;
    title: string;
    rating: number;
}

export interface Review {
    id: number;
    content: string;
    createdAt: string;
    journal: Journal;
    user: User;
}
