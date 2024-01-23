import React from 'react'
import GroupCard from '../../../componants/home/GroupCard'
import Images from '../../../utilities/Images'
import userImg from '../../../assets/images/user.jpg'
import './friendrequest.scss'

const FriendRequest = () => {
  return (
    <>
      <GroupCard cardtitle="Friend  Request">
      <div className='user_main'>
        {[0,1,2,3,4,5,6].map((item, index)=>(
          <div key={index} className="user_item">
          <div className="user_img_box">
              <Images source={userImg} alt="img not found"/>
          </div>
          <div className='friend_request_info_main'>
          <div className='user_name'>
            <h5>Masum</h5>
            <p>MERN Developer</p>
          </div>
            <button>
              accept
            </button>
          </div>
        </div>
        ))

        }

      </div>
      </GroupCard>
    </>
  )
}

export default FriendRequest