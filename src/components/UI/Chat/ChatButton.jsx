import React, {useEffect, useState} from 'react';
import classes from "./ChatButton.css"
import {useDispatch, useSelector} from "react-redux";
import {get_chats_fetch, send_message_fetch, update_status_message_fetch} from "../../../store/chatReduser";

// AwesomeIcons
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCommenting, faRemove, faChevronCircleRight} from "@fortawesome/free-solid-svg-icons";
library.add(faCommenting)
library.add(faRemove)
library.add(faChevronCircleRight)

const ChatButton = () => {
    const dispatcher = useDispatch()
    const current_user = useSelector(state => state.user.user)
    const isAuth = useSelector(state => state.user.isAuth)
    const chats = useSelector(state => state.user_chat.chats)

    const [isOpen, setIsOpen] = useState(false)
    const [isOnChat, setIsOnChat] = useState(false)
    const [chatId, setChatId] = useState(null)
    const [isLoadingChat, setIsLoadingChat] = useState(false)

    const [text, setText] = useState('')

    const badgeCount = 3

    // регулярна проверка сообщений чата
    useEffect(() => {
        if (isAuth) {
            dispatcher(get_chats_fetch({setIsLoading: setIsLoadingChat}))

            const interval = setInterval(() => {
                dispatcher(get_chats_fetch({setIsLoading: setIsLoadingChat}))
            }, 30 * 1000);  // интервал повторения в миллисекундах (раз в 30 сек)

            return () => {
                // для очистки интервала, чтобы функция не вызывалась
                // после того, как компонент будет удален из DOM
                clearInterval(interval);
            };
        }
    }, [isAuth,]);

    const doClick = (id) => {
        setIsOnChat(true)
        setChatId(id)
    }

    const currentChat = chats.find(chat => chat.id === chatId)

    const doClose = () => {
        setIsOpen(false)
        setIsOnChat(false)
        // setCurrentChat({})
        setText('')
    }

    const sendMessage = (e) => {
        e.preventDefault()
        const user_id = currentChat.users[0].id
        dispatcher(send_message_fetch({
            text: text,
            user_id: user_id,
            chat_id: chatId,
            user_create: current_user,
            setIsLoading: setIsLoadingChat
        }))
        setText('')


        // пролистать чат вниз
        const container = document.getElementById('chat-box');
        setTimeout(() => {
            container.scrollTop = container.scrollHeight;
        }, 200); // 0.2 секунды
    }

    function formatDatetime(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
        let formattedDate;
        if (isToday) {
            formattedDate = `${date.getHours()}:${(date.getMinutes()<10?'0':'') + date.getMinutes()}`;
        } else {
            const day = (date.getDate()<10?'0':'') + date.getDate();
            const month = ((date.getMonth()+1)<10?'0':'') + (date.getMonth()+1);
            const hours = date.getHours();
            const minutes = (date.getMinutes()<10?'0':'') + date.getMinutes();
            formattedDate = `${day}.${month} ${hours}:${minutes}`;
        }
        return formattedDate;
    }

    const updateStatus = (current_status, pk) => {
        if (!current_status) {
            dispatcher(update_status_message_fetch({status:true, pk:pk, setIsLoading: setIsLoadingChat}))
        }
    }

    return (
        <div>
            {isAuth && (
                <div>
                    {!isOpen ?
                        <button className="chat-button"
                                onClick={()=>setIsOpen(true)}
                        >
                            <FontAwesomeIcon icon={faCommenting}/>
                            {badgeCount > 0 &&
                                <span className="badge">
                                    <div className="badge_count">
                                        {badgeCount}
                                    </div>
                                </span>
                            }
                        </button>
                        :
                        <div className="chat-panel">
                            {!isOnChat ?
                                // вывод списка чатов
                                <div className="chats">
                                    {chats.map(chat => (
                                        <div className="chat-item"
                                             onClick={() => {
                                                 doClick(chat.id)
                                             }}
                                             key={chat.id}
                                        >
                                            <div className="chat-item-photo">
                                                <img src={chat.users[0].photo}/>
                                            </div>
                                            <div className="chat-item-body">
                                                <div className="chat-item-username">
                                                    {chat.users[0].username}
                                                </div>
                                                <div>
                                                    {/*если автор последнего сообщения - текущий пользователь, то добавит впереди "Вы: "*/}
                                                    {chat.messages[chat.messages.length - 1].user_create.username === current_user.username ?
                                                        <div className="last-message">
                                                            <span className="last-message-prefix">Вы:</span>
                                                            {chat.messages[chat.messages.length - 1].text}
                                                        </div>
                                                        :
                                                        <div className="last-message">
                                                            {chat.messages[chat.messages.length - 1].text}
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                :
                                // вывод выбранного чата
                                <div>
                                    <div className="chat-box"
                                         id="chat-box"
                                    >
                                        {
                                            currentChat.messages.map(message => (
                                                message.user_create.username === current_user.username
                                                    ?
                                                    <div key={message.id}
                                                         className="message-blob-your"
                                                    >
                                                        {/*вызываем обновление статуса в случае, */}
                                                        {/*если сообщение видно пользова*/}
                                                        {/*{updateStatus(message.status, message.id)}*/}
                                                        <div className="message-text">
                                                            {message.text}
                                                            <div className="sending-time">
                                                                {formatDatetime(message.date_time)}
                                                                <div>ok</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div key={message.id}
                                                         className="message-blob-addr"
                                                    >
                                                        <div className="message-text">
                                                            {message.text}
                                                            <div className="sending-time">
                                                                {formatDatetime(message.date_time)}
                                                            </div>
                                                        </div>
                                                    </div>
                                            ))
                                        }
                                    </div>
                                    <div className="chat-input">
                                        <form onSubmit={sendMessage}>
                                            <input type="text"
                                                   onChange={e => setText(e.target.value)}
                                                   value={text}
                                                   className="text-input"
                                                   placeholder="Написать сообщение..."
                                            />
                                            <button className="button-input"
                                            >
                                                <FontAwesomeIcon icon={faChevronCircleRight}/>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            }
                            <button className="close-chat-panel"
                                    onClick={doClose}
                            >
                                <FontAwesomeIcon icon={faRemove}/>
                            </button>
                        </div>
                    }
                </div>
            )}
        </div>
    );
};

export default ChatButton;