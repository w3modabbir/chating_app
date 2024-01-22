import React from 'react'
import GroupCard from '../../componants/home/GroupCard'
import Images from '../../utilities/Images'
import userImg from '../../assets/images/user.jpg'
import './home.scss'

const Home = () => {
  return (
    <div>
      <GroupCard cardtitle="User List">
          <div className='user_main'>
            <div className="user_item">
              <div className="user_img_box">
                  <Images source={userImg} alt="img not found"/>
              </div>

            </div>
          </div>
      </GroupCard>
    </div>
  )
}

export default Home