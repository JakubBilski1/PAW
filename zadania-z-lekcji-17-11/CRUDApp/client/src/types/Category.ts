export type Category = {
    id: number;
    postId: number;
    categoryId: number;
    category: {
        id: number;
        name: string;
    };
}