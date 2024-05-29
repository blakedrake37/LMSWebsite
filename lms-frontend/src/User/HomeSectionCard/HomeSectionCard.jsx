import React from 'react'

const HomeSectionCard = ({book}) => {
  return (
    <div className='cursor-pointer flex flex-col 
    items-center dark:bg-gray-800 rounded-lg shadow-lg 
    overflow-hidden w-[15rem] mx-3 border'>
        <div className='h-[13rem] w-[10rem]'>
            <img className='object-cover object-top w-full h-full' src={book.picture} alt="" />

        </div>
        <div className='p-4'>
            <h3 className='text-xl font-bold '>{book.title}</h3>
            <p className='text-gray-500 group-hover:text-white duration-high text-sm line-clamp-2'>{book.authors.length > 0 ? book.authors.map(author => author.authorName).join(', ') : 'No authors'}</p>
        </div>
    </div>
  )
}

export default HomeSectionCard