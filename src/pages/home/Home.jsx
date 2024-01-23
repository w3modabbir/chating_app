import React from 'react'
import './home.scss'
import UserList from './userList/UserList'
import FriendList from './friendList/FriendList'
import FriendRequest from './friendRequest/FriendRequest'
import BlockFriend from './blockFriend/BlockFriend'
import MyGroup from './myGroup/MyGroup'
import GroupList from './groupList/GroupList'

const Home = () => {
  return (
    <div className='home_main'>
        <UserList/>
        <FriendList/>
        <FriendRequest/>
        <BlockFriend/>
        <MyGroup/>
        <GroupList/>
    </div>
  )
}

export default Home