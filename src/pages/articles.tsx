import ArticleCard from '@/components/article/article'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useArticles from '@/hooks/use-articles'
import { useRef } from 'react'

const ViewArticles = () => {
  const { data, isLoading, setSearchVal, searchVal } = useArticles();
  const searchRef = useRef<HTMLInputElement>(null)

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchVal(searchRef.current!.value);
  }

  return (
    <>
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

      <div className='grid grid-cols-2 gap-4'>
        {
          isLoading && <>Loading articles ...</>
        }
        {
          data && data.map((article) => {
            return <ArticleCard article={article} />
          })
        }
      </div>
    </>
   
  )
}

export default ViewArticles;