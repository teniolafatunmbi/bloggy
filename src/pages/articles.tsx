import ArticleCard from '@/components/article/article'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useArticles from '@/hooks/use-articles'

const ViewArticles = () => {
  const { data, isLoading } = useArticles();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
  }

  if (isLoading) {
    return <>Loading articles...</>
  }

  return (
    <>
      <form onSubmit={handleSearch} className='flex flex-row items-center gap-3'>
        <Input 
          type="search" placeholder='Type author name or article title' 
          className='p-3 border rounded-md my-2 w-[20rem]' 
        />

        <Button 
          variant={'outline'} 
          className='p-6 bg-gray-300'
          type='submit'
        >
          Search
        </Button>
      </form>


      <div className='grid grid-cols-4 gap-4'>
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