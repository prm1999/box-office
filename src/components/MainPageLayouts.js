import React from 'react'
import Navs from './Navs'
import Title from './Title'

const MainPageLayouts = ({children}) => {
  return (
    <div>
      
    <Title title="Box Office" subtitle=' Are you looking For Movie or actor'/>
      <Navs/>
      {children}
    </div>
  )
}

export default MainPageLayouts
