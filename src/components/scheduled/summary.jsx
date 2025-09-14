import React from 'react'

const Summary = () => {
  return (
    <main className='flex flex-col justify-around my-10 p-4 border-2 rounded-lg h-60'>
      <p className='text-xl font-bold border-b-2 pb-2'>Weekend Summary</p>

      {/* <hr className='my-2 border-gray-300'/> */}

      <div className='flex items-center justify-center h-full gap-2'>
        <p className='text-center'>No activities scheduled yet. Start adding some fun to your weekend!</p>
      </div>

      {/* <hr className='my-2 border-gray-300 mt-auto'/> */}

      <div className='flex justify-between gap-2 text-sm pt-2 border-t-2'>
        <p>Total Activities: 5  </p>
        <p>Total Hours: 5 </p>
        <p>Saturday Activities: 5 </p>
        <p>Sunday Activities: 5 </p>

      </div>
    </main>
  )
}

export default Summary