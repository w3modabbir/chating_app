import React, { useEffect, useState } from 'react'
import './userlist.scss'
import GroupCard from '../../../componants/home/GroupCard'
import Images from '../../../utilities/Images'
import userImg from '../../../assets/images/user.jpg'
import { FaPlus } from "react-icons/fa";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import 'react-loading-skeleton/dist/skeleton.css'
import ListingWithThumbnail from '../../../componants/ReactSkeleton'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import TostifyReact from '../../../componants/TostifyReact'

const UserList = (props) => {
  const [userList, setUserList] = useState()
  const db = getDatabase();
  const data = useSelector((state) => state.loginuserdata.value)
  // console.log(data);
  const [frienRequest, setFriendRequest] = useState([])
  const [friendList, setFriendList] = useState([])

  // All user data read operation 
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

  // add friend request part 
  let handleFRequest = (friendRequestInfo) =>{
    set(ref(db, 'friendRequestInfo/' + friendRequestInfo.id), {
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
     // user Friends 
     useEffect(()=>{
      const friendRef = ref(db, 'friends');
      onValue(friendRef, (snapshot) => {
        let arr = []
        snapshot.forEach((item)=>{
          if( item.val().whoReceiveid == data.uid  || item.val().whoSendid ==  data.uid) {
            arr.push(item.val().whoReceiveid + item.val().whoSendid)
            
          }
        })
        setFriendList(arr)
    
      });
  
    },[])

   // user friend request data read operation 
   useEffect(()=>{
    const friendRequestRef = ref(db, 'friendRequestInfo');
    onValue(friendRequestRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        if(item.val().senderId == data.uid){
          arr.push(item.val().receiverid + item.val().senderId)

        }
      })
      setFriendRequest(arr)
  
    });
    
  },[])
 

  // user friend request cancle 
  let handleCancle = (canclerequest) =>{
    remove(ref(db, "friendRequestInfo/" + canclerequest.id)).then(()=>{

    })
  }

  return (
    
   <>
     <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    />
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
              {
                frienRequest.length > 0 && frienRequest.includes(item.id + data.uid) || frienRequest.includes(data.uid + item.id)
                  ?
                  <>
                    <div className="button">
                    <button>pending</button>
                    <button onClick={()=>handleCancle(item)}>cancel</button>
                    </div>
                  </>
                  :
                friendList.includes(data.uid + item.id) || friendList.includes(item.id + data.uid)
                  ?
                  <button>friend</button>
                  :
                  <button onClick={()=>handleFRequest(item)}>
                    Add
                  </button>
              }
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