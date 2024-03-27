import React, { useEffect, useState } from 'react'
import './message.scss'
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import Images from '../../utilities/Images';
import userImg from '../../../src/assets/images/user.jpg'
import Input from '../../componants/Input';
import { activeuser } from '../../slices/ActiveUserSlice';
import { IoSend } from "react-icons/io5";


const Message = () => {
  const [allMessage, setAllMessage] = useState([])
  const [massegText, setMassegText] = useState("")
  const [friendList, setFriendList] = useState();
  const db = getDatabase();
  const activechat = useSelector((state) => state?.activeuserdata?.value);
  const data = useSelector((state) => state.loginuserdata.value);
  const dispatch = useDispatch();
  console.log(activechat);
  // console.log(activechat);

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

    //frind list select
    let handleUser = (i)=>{
      dispatch(activeuser(i))
    }

    // message data write opreation
    let handleSubmit = () =>{
      set(push(ref(db, 'message')), {
        senderid: data.uid,
        sendername: data.displayName,
        senderemail: data.email ,
        message: massegText,
        recieverid: data.uid == activechat.whoReceiveid ? activechat.whoSendid : activechat.whoReceiveid,
        recievername: data.uid == activechat.whoReceiveid ? activechat.whoSendname : activechat.whoReceivename,
        recieveremail: data.uid == activechat.whoReceiveid ? activechat.whoSendemail : activechat.whoReceiveemail,
      }).then(()=>{
        console.log("msm send done");
      }) 
    }

     // message data read operation 
     useEffect(()=>{
      const messageRef = ref(db, 'message');
      onValue(messageRef, (snapshot) => {
        let arr = []
        let activeuser = activechat.whoSendid == data.uid ? activechat.whoReceiveid : activechat.whoSendid
        snapshot.forEach((item)=>{
          if((item.val().senderid == data.uid && item.val().recieverid == activeuser) || (item.val().recieverid == data.uid && item.val().senderid == activeuser)){
            arr.push({...item.val(),id:item.key})
            
            }
        })
        setAllMessage(arr)
    
      });
  
    },[activechat])

  return (
    <div className='message_main'>
      <div className='message_user_body'>
        <h3 className='list_heading'>Friend List</h3>
        <div className="sms_user_main">
          {friendList && friendList.length > 0
          ?
           friendList.map((item, index)=>(
            <div onClick={()=>handleUser(item)} key={index} className="sms_user_item">
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
                <button className='button' onClick={()=>handlefriendblock(item)}>
                  Message
                </button>
              </div>
            </div>
          ))
          :
          <h2 className='no_friend_props'>No Friend</h2>
          }
        </div>
      </div>
      {activechat != null ?
      <div className='message_user_sms'>
        <div className="sms_box_heading">
          <div className="user_img_box">
            {activechat !== null && 
            activechat.whoSendphoto == data.uid
            ?
            <Images source={activechat.whoReceivephoto} alt="img not found"/>
            :
            <Images source={activechat.whoSendphoto} alt="img not found"/>
            }
          </div>
         <div>
          <h2 className='name_item'>
            {activechat && 
            activechat.whoSendid == data.uid
            ?
            activechat.whoReceivename
            :
            activechat.whoSendname
            }
          </h2>
         </div>
        </div>
        <div className="msg_main">
          { allMessage.map((item, index)=>(
          <div key={index}  className={`${item.recieverid == data.uid ? "receive_msg" : "send_msg"}`}>
            <p>{item.message}</p>
          </div>

          ))

          }
          {/* <div className="receive_msg">
            <p>Hello</p>
          </div> */}
        </div>
        <div className="msg_footer">
            <input onChange={(e)=>setMassegText(e.target.value)} placeholder="Your messenge" className="msg_input" />
            <button onClick={handleSubmit} className='msg_send_btn'>send</button>
        </div>
      </div>
      :
      <div className='select_user'>
        <h2>Please Select a Friend List</h2>
      </div>

    }
    </div>
  )
}

export default Message