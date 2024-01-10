// import { $http } from "@/lib/http"

import { User } from "@/types";


type CreateUser = Omit<User, 'id'>;

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