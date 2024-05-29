import { Category } from "./Category";

export type Post = {
    id: number;
    title: string;
    content: string;
    published: boolean;
    user: {
        id: number;
        email: string;
        password: string;
    }
    categories: Category[];
    photos: string[];
}