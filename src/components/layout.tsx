import { ArticlesProvider } from '@/context'
import React from 'react'
import { Link } from 'react-router-dom'

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    
    <div className='w-screen h-screen grid grid-cols-12'>
         <aside className='px-4 py-2 col-span-2 border border-r-black/10'>
            <ul className='flex flex-col gap-3 my-6'>
                <li className='mb-0 border border-gray-500 cursor-pointer'>
                    <Link to={'/'} className='inline-block w-full p-4'>
                        See all articles
                    </Link>
                </li>
                <li className='mb-0 border border-gray-500 cursor-pointer'>
                    <Link to={'/create-article'} className='inline-block w-full p-4'>
                        Create article
                    </Link>
                </li>
            </ul>
        </aside>

        <ArticlesProvider>
            <section className='p-container-base col-span-10'>
                {children}
            </section>
        </ArticlesProvider>
    </div>
  )
}

export default Layout