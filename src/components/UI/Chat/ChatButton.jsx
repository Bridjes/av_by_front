import React, {useState} from 'react';
import classes from "./ChatButton.css"
import {useSelector} from "react-redux";

// AwesomeIcons
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCommenting, faRemove} from "@fortawesome/free-solid-svg-icons";
library.add(faCommenting)
library.add(faRemove)

const ChatButton = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const [isOpne, setIsOpen] = useState(false)
    const badgeCount = 3

    return (
        <div>
            {isAuth && (
                <div>
                    {!isOpne ?
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
                            <button className="close-chat-panel"
                                    onClick={()=>setIsOpen(false)}
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