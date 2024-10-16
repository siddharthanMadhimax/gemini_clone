import React, { useContext, useState } from 'react';
import "./sidebar.css";
import { assests } from '../../assets/assests';
import { Context } from '../../context/Context';

const SideBar = () => {
    const [extended, setExtended] = useState(false);
    const { onSent, previousPrompt, setRecentPrompt, newChat, deleteFromDb } = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    };

    const handleDelete = async (id) => {
        await deleteFromDb(id);
    };

    const handleRecentClick = async (prompt) => {
        await loadPrompt(prompt);
    };

    return (
        <div className='sidebar'>
            <div className="top">
                <img
                    className='menu'
                    src={assests.menu_icon}
                    alt=""
                    onClick={() => setExtended(prev => !prev)}
                />
                <div onClick={() => newChat()} className="new-chat">
                    <img src={assests.plus_icon} className='new-icon' alt="" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended ? (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {previousPrompt.map((item) => (
                            <div
                                key={item.id} // Use the UUID as key
                                className="recent-entry"
                                onClick={() => handleRecentClick(item.question)}
                            >
                                <img src={assests.message_icon} alt="" />
                                <p>{item.question.slice(0, 10)}...</p>
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(item.id);
                                }}>Delete</button>
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assests.question_icon} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assests.history_icon} alt="" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assests.setting_icon} alt="" />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    );
};

export default SideBar;
