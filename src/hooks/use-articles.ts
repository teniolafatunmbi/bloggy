import { $http } from '@/lib/http';
import { Article } from '@/types';
import { useQuery } from '@tanstack/react-query';

const useArticles = () => {
    const getArticles = async () => {
        const { data } = await $http.get('/posts');
    
        return data as Article[]
    }

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['articles'],
        queryFn: getArticles
    });

    return { data, isLoading, refetch }
}

export default useArticles;