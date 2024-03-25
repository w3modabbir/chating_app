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
          {friendList && friendList.map((item, index)=>(
            <div key={index} className="sms_user_item"></div>

          ))
          }
        </div>
      </div>
      <div className='message_user_sms'>Message</div>
    </div>
  )
}

export default Message