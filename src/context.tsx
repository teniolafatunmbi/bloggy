import { Dispatch, PropsWithChildren, createContext, useEffect, useState } from "react";
import { Article, User } from "./types";
import useArticles from "./hooks/use-articles";
import { getAllUsers } from "./adapter/user";

type ContextState = {
    articles: Article[] | undefined
    setArticles: Dispatch<React.SetStateAction<Article[] | undefined>>
    searchVal: string
    setSearchVal: Dispatch<React.SetStateAction<string>>,
    isLoading: boolean,
    usersCache: UsersCache,
    setUsersCache: Dispatch<React.SetStateAction<UsersCache>>,
    articlesCache: React.MutableRefObject<Article[] | undefined>,
    updateArticles: (article: Article) => void 
};

export const ArticlesContext = createContext({} as ContextState);


type UsersCache = {
    [k: string]: User
}

export const ArticlesProvider = ({ children }: PropsWithChildren) => {
    const { articles, setArticles, searchVal, setSearchVal, isLoading, articlesCache } = useArticles();
    const [usersCache, setUsersCache] = useState<UsersCache>({});

    const updateArticles = (article: Article) => {
        if (articlesCache.current) {
            articlesCache.current = [article, ...articlesCache.current!];

            setArticles(articlesCache.current);
    
            return articlesCache.current;
        }
    }

    useEffect(() => {
        getAllUsers().then((users) => {
            const preCache: UsersCache = {};
            users.forEach((user) => {
                preCache[`${user.id}`] = user;
            });
            setUsersCache(preCache);
        })
    }, []);

    useEffect(() => {
        if (articles) {            
            const filteredArticles = new Set<Article>()
            
            if (articlesCache.current) {
                articlesCache.current!.forEach((article) => {
                    const articleAuthor = usersCache[article.userId];
                    if (article.title.toLowerCase().includes(searchVal.toLowerCase().trim())) {
                        filteredArticles.add(article);
                    }
                    if (articleAuthor.name.toLowerCase().includes(searchVal.toLowerCase().trim())) {
                        filteredArticles.add(article);
                    }
                });
                const filteredArticlesArray = Array.from(filteredArticles);
                setArticles(filteredArticlesArray);
            }
            
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchVal]);
  
    return (
        <ArticlesContext.Provider value={{ 
            articles, 
            setArticles, 
            searchVal,
            setSearchVal, 
            isLoading,
            usersCache,
            setUsersCache,
            articlesCache,
            updateArticles
        }}>
            {children}
        </ArticlesContext.Provider>
    )
}