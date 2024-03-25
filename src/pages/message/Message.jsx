import React, { useEffect, useState } from 'react'
import './message.scss'
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";



const Message = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.loginuserdata.value)
  const [friendList, setFriendList] = useState()

    // user data read operation 
    useEffect(()=>{
      const friendRef = ref(db, 'friends');
      onValue(friendRef, (snapshot) => {
        let arr = []
        snapshot.forEach((item)=>{
          if(data.uid == item.val().whoReceiveid || data.uid == item.val().whoSendid){
            arr.push({...item.val(),id:item.key})
            
          }
        })
        setFriendList(arr)
    
      });
  
    },[])
  return (
    <div className='message_main'>
      <div className='message_user_body'>
        <h3 className='list_heading'>Friend List</h3>
        <div className="sms_user_main">
          {friendList && friendList.lenght > 0
          ?
           friendList.map((item, index)=>(
            // <div key={index} className="sms_user_item"></div>
            <div key={index} className="user_item">
          <div className="user_img_box">
            {data.uid == item.whoSendid
              ?
              <Images source={item.whoReceivephoto} alt="img not found"/>
              :
              <Images source={item.whoSendphoto} alt="img not found"/>

            }
          </div>
          <div className='friend_info_main'>
          <div className='user_name'>
            {data.uid == item.whoSendid
              ?
              <h3>{item.whoReceivename}</h3>
              :
              <h3>{item.whoSendname}</h3>

            }
            <p>MERN Developer</p>
          </div>
            <button className='button'>
              block
            </button>
          </div>
        </div>

          ))
          :
          <h2 className='no_friend_props'>No Friend</h2>
          }
        </div>
      </div>
      <div className='message_user_sms'>Message</div>
    </div>
  )
}

export default Message