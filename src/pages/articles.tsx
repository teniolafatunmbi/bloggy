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
    <div className='flex flex-row justify-between'>
      <form onSubmit={handleSearch} className='flex flex-row items-center gap-3'>
        <Input 
          type="search" 
          name='search'
          id="search"
          placeholder='Type author name or article title' 
          className='p-3 border rounded-md my-2 w-[20rem]' 
          ref={searchRef}
        />

        <Button 
          variant={'outline'} 
          className='p-6 bg-gray-300'
          type='submit'
        >
          Search
        </Button>
      </form>
    
      <div>
        {!isLoading && articles && articles.length > 0 && <>Total results: {articles.length}</>}
      </div>
    </div>
      

      <div className='grid grid-cols-2 gap-4'>
        {
          isLoading && <>Loading articles ...</>
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