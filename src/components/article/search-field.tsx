import React, { useContext, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { ArticlesContext } from '@/context';
import { Input } from '../ui/input';

const SearchField = () => {
    const { setSearchVal, setArticles, articlesCache } = useContext(ArticlesContext);
    const [searchInput, setSearchInput] = useState('');
    const searchRef = useRef<HTMLInputElement>(null);
  
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSearchVal(searchInput);
    }
  
  return (
    <form onSubmit={handleSearch} className='w-full flex flex-row flex-wrap items-center gap-2'>
        <Input
          type="search" 
          name='search'
          id="search"
          placeholder='Type author name or article title' 
          className='p-3 border rounded-md lg:my-2 w-[75%] md:w-1/4' 
          ref={searchRef}
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.currentTarget.value);
            if (e.currentTarget.value == "") {
              setArticles(articlesCache.current)
            }
          }}
        />

        <Button 
          variant={'outline'} 
          className='p-4 bg-gray-300'
          type='submit'
        >
          Search
        </Button>
    </form>
  )
}

export default SearchField