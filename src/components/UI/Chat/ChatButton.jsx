import React, {useEffect, useState} from 'react';
import classes from "./ChatButton.css"
import {useDispatch, useSelector} from "react-redux";
import {
    get_chats_fetch, open_chats,
    open_the_chat,
    send_message_fetch,
    update_status_message_fetch
} from "../../../store/chatReduser";

// AwesomeIcons
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCommenting,
    faRemove,
    faChevronCircleRight,
    faCircle,
    faCircleDot,
    faCircleCheck
    } from "@fortawesome/free-solid-svg-icons";
library.add(faCommenting)
library.add(faRemove)
library.add(faChevronCircleRight)
library.add(faCircle)
library.add(faCircleDot)
library.add(faCircleCheck)

const ChatButton = () => {
    const dispatcher = useDispatch()
    const current_user = useSelector(state => state.user.user)
    const isAuth = useSelector(state => state.user.isAuth)
    const chats = useSelector(state => state.user_chat.chats)

    const isOpen = useSelector(state => state.user_chat.isOpen)
    const isOnChat = useSelector(state => state.user_chat.isOnChat)
    const chatId = useSelector(state => state.user_chat.chatId)
    // const [isOpen, setIsOpen] = useState(false)
    // const [isOnChat, setIsOnChat] = useState(false)
    // const [chatId, setChatId] = useState(null)

    const [isLoadingChat, setIsLoadingChat] = useState(false)
    const [text, setText] = useState('')

    // регулярна проверка сообщений чата
    useEffect(() => {
        if (isAuth) {
            dispatcher(get_chats_fetch({setIsLoading: setIsLoadingChat}))

            const interval = setInterval(() => {
                dispatcher(get_chats_fetch({setIsLoading: setIsLoadingChat}))
            }, 3 * 1000);  // интервал повторения в миллисекундах (раз в 3 сек)

            return () => {
                // для очистки интервала, чтобы функция не вызывалась
                // после того, как компонент будет удален из DOM
                clearInterval(interval);
            };
        }
    }, [isAuth, ]);

    function countMessages() {
        let count = 0;
        chats.forEach(chat => {
            chat.messages.forEach(message => {
                if (!message.status && message.user_create.username !== current_user.username) {
                    count++;
                }
            });
        });
        return count;
    }

    const badgeCount = countMessages()

    const currentChat = chats.find(chat => chat.id === chatId)

    // обновление статуса прочтения сообщений
    useEffect(() => {
        // обновление статусов просмотра
        if (currentChat && isOnChat) {
            currentChat.messages.map(msg => {
                if ((!msg.status) && (msg.user_create.username !== current_user.username))
                    if (!msg.status)
                        dispatcher(update_status_message_fetch({
                            status: true,
                            pk: msg.id,
                            setIsLoading: setIsLoadingChat,
                            chat_id:chatId
                        }))
            })
        }
    }, [chatId, chats])

    const doClick = (id) => {
        dispatcher(open_the_chat({
            isOnChat: true,
            chat_id: id
        }))
        // setIsOnChat(true)
        // setChatId(id)
    }

    const doClose = () => {
        dispatcher(open_chats(false))
        dispatcher(open_the_chat({
            isOnChat: false,
            chat_id: null
        }))
        // setIsOpen(false)
        // setIsOnChat(false)
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

    return (
        <div>
            {isAuth && (
                <div>
                    {!isOpen ?
                        <button className="chat-button"
                                onClick={()=> dispatcher(open_chats(true))}
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
                                    <div className="chat-user">
                                        <div className="chat-user-photo">
                                            <img src={currentChat.users[0].photo}/>
                                        </div>
                                        <div className="chat-user-name">
                                            {currentChat.users[0].username}
                                        </div>
                                    </div>
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
                                                        <div className="message-text">
                                                            <div className="txt">
                                                                {message.text}
                                                            </div>
                                                            <div className="sending-time">
                                                                {"status" in message ?
                                                                    message.status ?
                                                                        // прочитано
                                                                        <div>{formatDatetime(message.date_time)}
                                                                            <span className="message-status">
                                                                                <FontAwesomeIcon icon={faCircleCheck}/>
                                                                            </span>
                                                                        </div>
                                                                        :
                                                                        // отправлено успешно
                                                                        <div>{formatDatetime(message.date_time)}
                                                                            <span className="message-status">
                                                                                <FontAwesomeIcon icon={faCircle}/>
                                                                            </span>
                                                                        </div>
                                                                    :
                                                                    // отправляется
                                                                    <div className="message-status"><FontAwesomeIcon icon={faCircleDot}/></div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div key={message.id}
                                                         className="message-blob-addr"
                                                    >
                                                        {/*вызываем обновление статуса в случае, */}
                                                        {/*если сообщение видно пользователю/}
                                                        {/*{updateStatus(message.status, message.id)}*/}
                                                        <div className="message-text">
                                                            <div className="txt">
                                                                {message.text}
                                                            </div>
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