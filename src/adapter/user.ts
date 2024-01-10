import { $http } from "@/lib/http";
import { User } from "@/types";


type CreateUser = Omit<User, 'id'>;

/**
 * JSONTypicode doesn't provide a user creation endpoint. Everything related to user creation is client-side cache.
 */
export const createUser = (lastUserId: number, payload: CreateUser): User => {
    const user = { 
        id: lastUserId + 1, 
        name: payload.name, 
        email: payload.email, 
        phone: payload.phone 
    };
    // return $http.post('/user', payload);
    return user;
}


export const getUser = async (userId: number): Promise<User> => {
    const res = await $http.get(`/users/${userId}`);
    return res.data;
}

export const getAllUsers = async(): Promise<User[]>  => {
    const res = await $http.get(`/users`);
    return res.data;
}