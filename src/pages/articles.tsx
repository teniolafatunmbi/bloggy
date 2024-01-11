import ArticleCard from '@/components/article/article'
import SearchField from '@/components/article/search-field'
import { ArticlesContext } from '@/context'
import { useContext } from 'react'

const ViewArticles = () => {
  const { articles, isLoading, searchVal } = useContext(ArticlesContext);

  return (
    <>
    <div className='mb-3'>
      <SearchField />
    
      <p className='mb-0 text-[14px] text-gray-800'>
        {!isLoading && articles && articles.length > 0 &&  <>{articles.length} {articles.length >1 ? 'articles': 'article'} found </>}
      </p>
    </div>
      

      <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
        {
          isLoading && <>Loading articles...</>
        }
        {
          articles && articles.length > 0 && (
            articles.map((article) => {
            return <ArticleCard key={article.id} article={article} />
          })
          )
        }

        {
          articles && articles.length == 0 && <div>No articles found</div>
        }
      </div>
    </>
   
  )
}

export { ViewArticles };