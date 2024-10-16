import React, { useContext } from 'react'
import "./Main.css"
import { assests } from '../../assets/assests'
import {Context} from "../../context/Context"

const Main = () => {
    var funOnset=()=>{
      
        onSent()
        setInput('')
       
    }
    var {onSent,recentPrompt,showResult,loading,resultDAta,setInput,input}=useContext(Context)
  return (
    <div className='main'>
        <div className='nav'>
            <p>Ammu</p>
            <img src={assests.user_icon} alt="" />
        </div>
        <div className="main-container">
            {!showResult ? <>
                <div className="greet">
                <p className='text-coral-red'><span>Hello, Sidhu.</span></p>
                <p>How can i help you</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest beuatiful places to see on an upcoming road trip</p>
                    <img src={assests.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Breifly summerize the concept of urban planning</p>
                    <img src={assests.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Brainstorm team bonding for work partner</p>
                    <img src={assests.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Improve the readability of the following code</p>
                    <img src={assests.code_icon} alt="" />
                </div> 
            </div>
            </> : <div className='result'>
                       <div className='result-title'>
                        <img src={assests.user_icon} alt="" />
                        <p>{recentPrompt}</p>
                       </div>
                       <div className='result-data'>
                        <img src={assests.gemini_icon} alt="" />
                        {loading ? <div className='loader'>
                            <hr />
                            <hr />
                            <hr />
                        </div>
                            : <p dangerouslySetInnerHTML={{__html:resultDAta}}></p>}
                       
                       </div>
                   </div>
            }
            <div className="main-bottom">
                <div className="search-box">
                    <input type="text" placeholder='Enter prompt ' onChange={(e)=>setInput(e.target.value)} value={input} />
                    <div>
                       <img src={assests.gallery_icon} alt="" />
                       <img src={assests.mic_icon} alt="" />
                       <img src={assests.send_icon} onClick={funOnset} alt="" />
                    </div>
                </div>
                <p className="bottom-info">
                    Gemini may display inaccurate info,so please double check it
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main