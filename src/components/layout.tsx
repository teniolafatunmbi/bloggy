import React from 'react'
import { Link } from 'react-router-dom'

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='w-screen h-screen grid grid-cols-12'>
         <aside className='px-4 py-2 col-span-2 border border-r-black/10'>
            <ul>
                <li className='mb-0 p-4'>
                    <Link to={'/'}>
                        See all articles
                    </Link>
                </li>
                <li className='mb-0 p-4'>
                    <Link to={'/create-article'}>
                        Create article
                    </Link>
                </li>
            </ul>
        </aside>

        <section className='p-container-base col-span-10'>
            {children}
        </section>
    </div>
  )
}

export default Layout