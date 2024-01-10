import { $http } from "@/lib/http"

import { User } from "@/types";

export const getUser = async (userId: number): Promise<User> => {
    const res = await $http.get(`/users/${userId}`);
    return res.data;
}

export const getAllUsers = async(): Promise<User[]>  => {
    const res = await $http.get(`/users`);
    return res.data;
}