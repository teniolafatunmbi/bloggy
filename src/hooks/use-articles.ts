import { useRef, useState } from 'react';
import { $http } from '@/lib/http';
import { Article } from '@/types';
import { useQuery } from '@tanstack/react-query';

const useArticles = () => {
    const [searchVal, setSearchVal] = useState('');
    const [articles, setArticles] = useState<Article[]>();
    const articlesCache = useRef<Article[]>();

    const getArticles = async () => {
        const params = {};
        
        if (!articles) {
            console.log('No articles!!', {articles})
            const { data } = await $http.get('/posts', {params});

            setArticles(data);
            articlesCache.current = data;
        
            return data as Article[];
        }

        if (!searchVal) {
            setArticles(articlesCache.current)
        }
        
        return articles;
    }

    const { isLoading, refetch } = useQuery({
        queryKey: ['articles', searchVal],
        queryFn: getArticles,
    });

    return { articles, setArticles, isLoading, refetch, setSearchVal, searchVal, articlesCache }
}

export default useArticles;