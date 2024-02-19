import React, { useEffect, useState } from 'react'
import GroupCard from '../../../componants/home/GroupCard'
import Images from '../../../utilities/Images'
import './blockfriend.scss'
import userImg from '../../../assets/images/user.jpg'
import { useSelector} from 'react-redux'
import { getDatabase, ref, onValue, remove} from "firebase/database";
import { toast } from 'react-toastify';

const BlockFriend = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.loginuserdata.value)
  const [frienBlock, setFriendBlock] = useState()
  // user read data operation
  useEffect(()=>{
    const blockRef = ref(db, 'block');
    onValue(blockRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        if(data.uid == item.val().whoblockid){
          arr.push({...item.val(),id:item.key})   
        }
      })
      setFriendBlock(arr)
  
    });

  },[])

  let handleunblock = (friendunblock) =>{
    console.log(friendunblock);
    remove(ref(db, "block/" + friendunblock.id))
  }

  return (
    <>
    <GroupCard cardtitle="Blocked Users">
    <div className='user_main'>
      {frienBlock && frienBlock.length > 0 ? frienBlock.map((item, index)=>(
        <div key={index} className="user_item">
        <div className="user_img_box">
            <Images source={item.blockuserphoto} alt="img not found"/>
        </div>
        <div className='block_info_main'>
        <div className='user_name'>
          <h5>{item.blockusername}</h5>
          <p>MERN Developer</p>
        </div>
          <button className='button' onClick={()=>handleunblock(item)}>
            unblock
          </button>
        </div>
        </div>
      ))
      :
      <h3>no block list</h3>
      }



    </div>
    </GroupCard>
    </>
  )
}

export default BlockFriend