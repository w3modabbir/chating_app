import React, { useEffect, useState } from 'react'
import GroupCard from '../../../componants/home/GroupCard'
import Images from '../../../utilities/Images'
import userImg from '../../../assets/images/user.jpg'
import './friendrequest.scss'
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, ref, onValue, set, push } from "firebase/database";

const FriendRequest = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.loginuserdata.value)
  const [frienRequest, setFriendRequest] = useState()

    // user data read operation 
    useEffect(()=>{
      const friendRequestRef = ref(db, 'friendRequestInfo');
      onValue(friendRequestRef, (snapshot) => {
        let arr = []
        snapshot.forEach((item)=>{
          if(data.uid == item.val().receiverid){
            arr.push({...item.val(),id:item.key})
  
          }
        })
        setFriendRequest(arr)
    
      });
  
    },[])


  return (
    <>
      <GroupCard cardtitle="Friend  Request">
      <div className='user_main'>
      {frienRequest && frienRequest.length > 0 ?
        frienRequest.map((item,index)=>(
          <div key={index} className="user_item">
          <div className="user_img_box">
              <Images source={item.senderPhoto} alt="img not found"/>
          </div>
          <div className='friend_request_info_main'>
          <div className='user_name'>
            <h5>{item.senderName}</h5>
            <p>MERN Developer</p>
          </div>
            <button>
              accept
            </button>
          </div>
        </div>
           ))
           :
           <h2>no request </h2>
         
         }
      </div>
      </GroupCard>
    </>
  )
}

export default FriendRequest