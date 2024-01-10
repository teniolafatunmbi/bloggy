import { $http } from "@/lib/http"
import { Article } from "@/types";

type CreateArticle = Omit<Article, 'id' | 'user'>;

export const createArticle = async (payload: CreateArticle): Promise<Article> => {
    const res = await $http.post('/posts', payload);
    return res.data;
}