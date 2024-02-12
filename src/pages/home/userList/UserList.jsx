import React, { useEffect, useState } from 'react'
import './userlist.scss'
import GroupCard from '../../../componants/home/GroupCard'
import Images from '../../../utilities/Images'
import userImg from '../../../assets/images/user.jpg'
import { FaPlus } from "react-icons/fa";
import { getDatabase, ref, onValue } from "firebase/database";
import { Blocks } from 'react-loader-spinner'

const UserList = () => {
  const [userList, setUserList] = useState()
  const db = getDatabase();

  // user data read operation 
  useEffect(()=>{
    const userRef = ref(db, 'users');
    onValue(userRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        arr.push({...item.val(),id:item.key})
      })
      setUserList(arr)
  
    });

  },[])
  console.log(userList);

  return (
   <>
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
                <button>
                  <FaPlus />
                </button>
              </div>
              </div>
              ))
              :
              <div className='bloocks'>
                <Blocks
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                visible={true}
                />
              </div>
            
            }
        </div>
    </GroupCard>
   </>
  )
}

export default UserList