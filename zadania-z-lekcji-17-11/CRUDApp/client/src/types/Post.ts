import { User } from "./User";

export type Post = {
    id: number;
    title: string;
    content: string;
    published: boolean;
    user: User[]
    categories: string[];
    photos: string[];
}