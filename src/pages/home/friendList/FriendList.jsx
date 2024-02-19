import React, { useEffect, useState } from 'react'
import GroupCard from '../../../componants/home/GroupCard'
import Images from '../../../utilities/Images'
import userImg from '../../../assets/images/user.jpg'
import { FaPlus } from "react-icons/fa";
import './friendlist.scss'
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { toast } from 'react-toastify';
import TostifyReact from '../../../componants/TostifyReact'

const FriendList = () => {
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
  
console.log(friendList);
  return (
   <>
    <GroupCard cardtitle="Friends">
    <div className='user_main'>
      {friendList && friendList.length > 0
        ?
        friendList.map((item,index)=>(
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
        <h2>nai</h2>
      }

    </div>
    </GroupCard>
   </>
  )
}

export default FriendList