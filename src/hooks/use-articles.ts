import { useState } from 'react';
import { $http } from '@/lib/http';
import { Article } from '@/types';
import { useQuery } from '@tanstack/react-query';

const useArticles = () => {
    const [searchVal, setSearchVal] = useState('');
    const [articles, setArticles] = useState<Article[]>();

    const getArticles = async () => {
        const params = {};
        
        if (!articles) {
            const { data } = await $http.get('/posts', {params});

            setArticles(data);
        
            return data as Article[];
        }

        if (searchVal) {
            const filteredArticles: Article[] = [];

            articles.forEach((article) => {
                if (article.title.includes(searchVal)) {
                    filteredArticles.push(article);
                }
            });

            setArticles(filteredArticles);

            return filteredArticles;
        }
        
        return articles;
    }

    const { isLoading, refetch } = useQuery({
        queryKey: ['articles', searchVal],
        queryFn: getArticles,
    });

    return { articles, setArticles, isLoading, refetch, setSearchVal, searchVal }
}

export default useArticles;