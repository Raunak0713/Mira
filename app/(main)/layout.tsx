import React from 'react'

const MainLayout = ({ children } : { children : React.ReactNode }) => {
  return (
    <div className='mx-auto mt-5 container'>
      { children }
    </div>
  )
}

export default MainLayout