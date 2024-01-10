import { $http } from "@/lib/http"
import { Article } from "@/types";

type CreateArticle = Omit<Article, 'id' | 'user'>;

/**
 * Using `lastArticleId` to update the article ID to avoid duplicate `key` issue with React. 
 * article.id is used as the unique value for rendering articles
 */
export const createArticle = async (lastArticleId: number, payload: CreateArticle): Promise<Article> => {
    const res = await $http.post('/posts', payload);
    res.data.id = lastArticleId + 1;
    
    return res.data;
}