import Conversation from '../../Components/Conversation/Conversation'
import Message from '../../Components/Message/Message'
import Topbar from '../../Components/Topbar/Topbar'
import './messenger.css'
import { Button } from '@mui/material';
import ChatOnline from '../../Components/ChatOnline/ChatOnline';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axios from "axios";
import  io from "socket.io-client"

const Messenger = () => {

    const { user } = useContext(AuthContext);
    const [conversation,setConversation] = useState([]);
    const [messages,setMessages] = useState([]);
    const [newMessage,setNewMessage] = useState("");
    const [currentChat,setCurrentChat] = useState(null);
    const socket = useRef();
    const scrollRef = useRef();//for automatic scrolling of msg after getting new msg
    const [arrivalMessage,setArrivalMessage] = useState(null);
    const [onlineUsers,setOnlineUsers] = useState([]);

    const sendMessage = async(e) => {
        e.preventDefault();
        const newMsg = {
            conversationId: currentChat._id,
            sender:user._id,
            text:newMessage
        } 

        const receiverId = currentChat.members.find(member=>member!== user._id);

        socket.current.emit("sendMessage",{
            senderId: user._id,
            receiverId,
            text: newMessage,
        })

        try {
           const res = await axios.post("http://localhost:4000/message",newMsg)
           setMessages([...messages,res.data]);
           setNewMessage("")
        } catch (error) {
            console.log(error);
        }
    }

    const getMessage = async() => {
        try {
            const resMessage = await axios.get("http://localhost:4000/message/"+currentChat?._id);
                setMessages(resMessage.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getConversation = async() => {
        try {
            const res = await axios.get("http://localhost:4000/conversation/"+user._id);
                setConversation(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getConversation();
    },[]);

    useEffect(() => {
        getMessage();
    },[currentChat]);

    //for scrolling automatically
    useEffect(() => {
        scrollRef.current?.scrollIntoView({bahavior:"smooth"})
    },[messages])

   // for socket connection rendering
    useEffect(() => {
        socket.current = io.connect("http://localhost:5000");
        socket.current.on("getMessage",data=> {
            setArrivalMessage({
                sender:data.senderId,
                text:data.text,
                createdAt:Date.now(),
            })
        })
    },[]) 

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages((prev) => [...prev,arrivalMessage]);//to prevent from including messages as extra dependency in useEffect prev fn has been used.
    },[arrivalMessage,currentChat]);

   //for taking event from server socket
    useEffect(() => {
        //for receiving event from the server side
        // socket?.on("welcome",message=>{
        //     console.log(message);
        // })

        socket.current.emit("addUser", user._id);//sending userID from client to server
        socket.current.on("getUsers",users=>{
            setOnlineUsers(
                user.following.filter((f)=>users.some((u) =>u.userId ===f))
            );
        })
    },[user]);


  return (
    <>
    <Topbar/>
    <div className="messenger">
       
        <div className="row">
            <div className="col-lg-3 order-lg-1 col-md-3 col-sm-6 order-sm-1 order-1">
                <div className="chatmenu">
                    <input type="text" className="form-control chatmenu-input" placeholder="Search for friends" />
                    {conversation.map((c,key) => (
                        <div className="convesation-messenger" key={c._id} onClick={() => setCurrentChat(c)}>
                        <Conversation conversations={c} currentUser={user}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className="col-lg-6 order-lg-2 col-md-6  col-sm-12 order-sm-3 order-3">
                <div className="chatbox">
                   {currentChat ? <>
                   <h2 className='chat-box-title'>Chat Box</h2>
                    <div className="chatbox-top">
                        {messages.map((msg,key) => (
                            <div className='msg-wrapper' key={msg._id} ref={scrollRef}>
                                <Message key={msg._id} currentChat={currentChat} message={msg} own={msg.sender === user._id}/>
                            </div>
                        ))}    
                        </div>
                    <div className="chatbox-bottom">
                        <textarea className='chat-input-area' placeholder='write something..' value={newMessage} onChange={(e) =>setNewMessage(e.target.value)}></textarea>
                        <Button variant="contained" color="success" className='send-button' onClick={sendMessage}>Send</Button>
                    </div>
                   </> : <span className='no-conversation-text'>Open a Conversation to start a chat</span>
                    }
                </div>
            </div>
            <div className="col-lg-3 order-lg-3 col-md-3 col-sm-6 order-sm-2 order-2">
                <div className="chatonline">
                <h2 className='online-users-title'>Online Users</h2>
                <ChatOnline onlineUsers={onlineUsers} currentUserId={user._id} setCurrentChat={setCurrentChat} setConversation={setConversation}/>        
                </div>
            </div>        
        </div>
    </div>

    </>
  )
} 

export default Messenger