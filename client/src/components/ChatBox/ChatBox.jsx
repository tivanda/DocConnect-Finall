import React, { useState } from "react";
import { useEffect } from "react";
import { getMessages, addMessage } from "../../api/MessageRequest";
import "./ChatBox.css";
import { format } from "timeago.js";
import { getUser } from "../../api/UserRequest";
import InputEmoji from "react-input-emoji";
import { useRef } from "react";

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();

  useEffect(() => {
    if ((receivedMessage !== null) & (receivedMessage?.chatId === chat?._id)) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        console.log(data);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };

    //send message to data

    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }

    //socket server send mes
    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });
  };

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={
                      userData?.profilePicture
                        ? process.env.REACT_APP_PUBLIC_FOLDER +
                          userData.profilePicture
                        : process.env.REACT_APP_PUBLIC_FOLDER +
                          "defaultProfile.png"
                    }
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                  </div>
                </div>
              </div>
              <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
            </div>

            <div className="chat-body">
              {messages.map((message) => (
                <>
                  <div
                    ref={scroll}
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{message.text}</span>
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>

            <div className="chat-sender">
              <div>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div className="send-button button" onClick={handleSend}>
                Send
              </div>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a Chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
