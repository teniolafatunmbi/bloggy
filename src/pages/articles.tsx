import ArticleCard from '@/components/article/article'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArticlesContext } from '@/context'
import { useContext, useRef } from 'react'

const ViewArticles = () => {
  const { articles, isLoading, setSearchVal } = useContext(ArticlesContext);
  const searchRef = useRef<HTMLInputElement>(null)

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchVal(searchRef.current!.value);
  }

  return (
    <>
    <div className='mb-3'>
      <form onSubmit={handleSearch} className='w-full flex flex-row flex-wrap items-center gap-2'>
        <Input 
          type="search" 
          name='search'
          id="search"
          placeholder='Type author name or article title' 
          className='p-3 border rounded-md lg:my-2 w-[75%] md:w-1/4' 
          ref={searchRef}
        />

        <Button 
          variant={'outline'} 
          className='p-4 bg-gray-300'
          type='submit'
        >
          Search
        </Button>
      </form>
    
      <p className='mb-0 text-[14px] text-gray-800'>
        {!isLoading && articles && articles.length > 0 && <>Total results: {articles.length}</>}
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