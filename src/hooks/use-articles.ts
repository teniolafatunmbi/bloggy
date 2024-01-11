import { useEffect, useRef, useState } from 'react';
import { $http } from '@/lib/http';
import { Article } from '@/types';

const useArticles = () => {
    const [searchVal, setSearchVal] = useState('');
    const [articles, setArticles] = useState<Article[]>();
    const articlesCache = useRef<Article[]>();

    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const getArticles = async () => {
            const params = {};
            
            if (!articles) {
                setIsLoading(true);
                const { data } = await $http.get('/posts', {params});
                setIsLoading(false);
    
                setArticles(data);
                articlesCache.current = data;
            
                return data as Article[];
            }
    
            if (!searchVal) {
                setArticles(articlesCache.current)
            }
            
            return articles;
        }

        getArticles();
    }, [articles, searchVal])

    return { articles, setArticles, isLoading, setSearchVal, searchVal, articlesCache }
}

export default useArticles;