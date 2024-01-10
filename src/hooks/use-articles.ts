import { useState } from 'react';
import { $http } from '@/lib/http';
import { Article } from '@/types';
import { useQuery } from '@tanstack/react-query';

const useArticles = () => {
    const [searchVal, setSearchVal] = useState('');

    const getArticles = async () => {
        let params = {};
        if (searchVal) {
            params = { title: searchVal }
        }

        const { data } = await $http.get('/posts', {params});
    
        return data as Article[]
    }

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['articles', searchVal],
        queryFn: getArticles
    });

    return { data, isLoading, refetch, setSearchVal, searchVal }
}

export default useArticles;