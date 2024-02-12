import React, { useEffect, useState } from 'react'
import './userlist.scss'
import GroupCard from '../../../componants/home/GroupCard'
import Images from '../../../utilities/Images'
import userImg from '../../../assets/images/user.jpg'
import { FaPlus } from "react-icons/fa";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import 'react-loading-skeleton/dist/skeleton.css'
import ListingWithThumbnail from '../../../componants/ReactSkeleton'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import TostifyReact from '../../../componants/TostifyReact'

const UserList = (props) => {
  const [userList, setUserList] = useState()
  const db = getDatabase();
  const data = useSelector((state) => state.loginuserdata.value)

  // user data read operation 
  useEffect(()=>{
    const userRef = ref(db, 'users');
    onValue(userRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        if(data.uid != item.key){
          arr.push({...item.val(),id:item.key})

        }
      })
      setUserList(arr)
  
    });

  },[])

  // friend request part 
  let handleFRequest = (friendRequestInfo) =>{
    console.log(friendRequestInfo);
    set(push(ref(db, 'friendRequestInfo')), {
     senderId: data.uid,
     senderName: data.displayName,
     senderPhoto: data.photoURL,
     senderEmail: data.email, 
      // receiver part 
      receiverid: friendRequestInfo.id,
      receivername: friendRequestInfo.username,
      receiveremail: friendRequestInfo.email,
      receiverimg: friendRequestInfo.profile_picture,
    }).then(()=>{
      toast.success("Friend Request Send Successful", {
        position: "top-right",
        autoClose: 5000,
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
    <GroupCard cardtitle="User List">
          <div className='user_main'>
            {userList && userList.length > 0
              ?
               userList.map((item,index)=>(
              <div key={index} className="user_item">
              <div className="user_img_box">
                  <Images source={item.profile_picture} alt="img not found"/>
              </div>
              <div className='user_info_main'>
              <div className='user_name'>
                <h5>{item.username}</h5>
                <p>MERN Developer</p>
              </div>
                <button onClick={()=>handleFRequest(item)}>
                  <FaPlus />
                </button>
              </div>
              </div>
              ))
              :
              <ListingWithThumbnail/>
            }
        </div>
    </GroupCard>
   </>
  )
}

export default UserList