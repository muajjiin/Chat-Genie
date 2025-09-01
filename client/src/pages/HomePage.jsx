import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSideber from '../components/RightSideber'

const HomePage = () => {

  const [selectedUser, setSelectedUser] = useState(false)

  return (
    <div className='border w-full h-screen sm:px-[15%] sm:py-[5%] flex'>
 <div className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl 
  w-full h-full grid grid-cols-1 relative ${
    selectedUser 
      ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' 
      : 'md:grid-cols-2'
  }`}> 
      
  <Sidebar selectedUser={selectedUser} setselectedUser={setSelectedUser}/>
  <ChatContainer selectedUser={selectedUser}  setSelectedUser={setSelectedUser}/>
  <RightSideber selectedUser={selectedUser} />
      
      </div>
    </div>
  )
}

export default HomePage
