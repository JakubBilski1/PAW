export type User = {
    id: number;
    email: string;
    password: string;
    error: string;
}

export type UserProfile = {
    userId: number;
    firstName: string;
    lastName: string;
    nickName: string;
    city: string;
    country: string;
    dob: Date;
    createdAt: Date;
    updatedAt: Date;
    error: string;
}