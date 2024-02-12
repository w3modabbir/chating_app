import React, { useEffect, useState } from 'react'
import GroupCard from '../../../componants/home/GroupCard'
import Images from '../../../utilities/Images'
import userImg from '../../../assets/images/user.jpg'
import './friendrequest.scss'
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import ListingWithThumbnail from '../../../componants/ReactSkeleton'
import { ImCross } from "react-icons/im";
import TostifyReact from '../../../componants/TostifyReact'
import { toast } from 'react-toastify'

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

    // cancle request 
    let handleCancleRequest = (friendRequestCancle)=>{
      console.log(friendRequestCancle);
      remove(ref(db, "friendRequestInfo/" + friendRequestCancle.id)).then(()=>{
        toast.success('Friend Request Cancle Success..', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      })
    }
  return (
    <>
    <TostifyReact/>
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
            <button className='button' onClick={()=>handleCancleRequest(item)}>
             <ImCross />
            </button>
          </div>
        </div>
           ))
           :
           <h2 className='request'>Friend Request is No Found...</h2>
         
         }
      </div>
      </GroupCard>
    </>
  )
}

export default FriendRequest