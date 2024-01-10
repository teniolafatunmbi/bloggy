import { Dispatch, PropsWithChildren, createContext, useEffect, useState } from "react";
import { Article, User } from "./types";
import useArticles from "./hooks/use-articles";
import { getAllUsers } from "./adapter/get-user";

type ContextState = {
    articles: Article[] | undefined
    setArticles: Dispatch<React.SetStateAction<Article[] | undefined>>
    setSearchVal: Dispatch<React.SetStateAction<string>>,
    isLoading: boolean,
    usersCache: UsersCache,
    setUsersCache: Dispatch<React.SetStateAction<UsersCache>>,
};

export const ArticlesContext = createContext({} as ContextState);


type UsersCache = {
    [k: string]: User
}

export const ArticlesProvider = ({ children }: PropsWithChildren) => {
    const { articles, setArticles, setSearchVal, isLoading } = useArticles();
    const [usersCache, setUsersCache] = useState<UsersCache>({});

    useEffect(() => {
        getAllUsers().then((users) => {
            const preCache: UsersCache = {};
            users.forEach((user) => {
                preCache[`${user.id}`] = user
            });
            setUsersCache(preCache);
        })
    }, [])
  
    return (
        <ArticlesContext.Provider value={{ 
            articles, 
            setArticles, 
            setSearchVal, 
            isLoading,
            usersCache,
            setUsersCache
        }}>
            {children}
        </ArticlesContext.Provider>
    )
}