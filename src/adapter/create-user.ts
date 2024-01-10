// import { $http } from "@/lib/http"

import { User } from "@/types";


type CreateUser = Omit<User, 'id'>;

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const createUser = (payload: CreateUser): User => {
    const user = { 
        id: getRandomInt(1, 100), 
        name: payload.name, 
        email: payload.email, 
        phone: payload.phone 
    };
    // return $http.post('/user', payload);
    return user;
}