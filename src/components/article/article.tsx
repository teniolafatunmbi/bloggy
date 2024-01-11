import { Article, User } from '@/types'
import { Card, CardContent, CardHeader } from '../ui/card'
import { truncateText } from '@/lib'
import { useContext, useEffect, useState } from 'react'
import { ArticlesContext } from '@/context'

const ArticleCard = ({ article }: { article: Article}) => {
  const { usersCache } = useContext(ArticlesContext);
  const [articleAuthor, setArticleAuthor] = useState<User>();

  useEffect(() => {
      setArticleAuthor(usersCache[`${article.userId}`]);
  }, [article.userId, usersCache]);

  return (
        <Card data-testid="article-card">
            <CardHeader data-testid="article-title" className='font-medium text-xl mb-3'>{article.title}</CardHeader>
            <CardContent data-testid="article-content">
              <div>
                {truncateText(article.body, 150)}
              </div>

              <div className='flex flex-row gap-2 justify-end text-sm'>
                <span className='text-gray-700'>Author:</span>
                <section className='mb-0 text-gray-600'>
                  <p className='mb-0' data-testid="article-author-name">{articleAuthor?.name}</p>
                  <p className='mb-0' data-testid="article-author-email">{articleAuthor?.email}</p>
                </section>
              </div>
            </CardContent>
        </Card>
        )
}

export default ArticleCard