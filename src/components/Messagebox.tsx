import React, { useState,useEffect } from 'react'
import { styled } from 'styled-components'
import useConnectClient from '../hooks/useConnectClient';

const Messagebox = () => {
    const [message,setMessage] = useState("")
    const [room,setRoom] = useState("")

    const client = useConnectClient();

    useEffect(()=>{
        if(client == null) return;
        client.on('message',(message:string) => {
            displayMessage(message)
        })
    },[client])

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(client == null) return;
        if(message){
            client.emit('message',message)
            displayMessage(message)
        }
        if(room){
            client.emit('join',room)
        }
    }

    const displayMessage = (message:string) => {
        document.getElementsByClassName('message-container')[0].innerHTML += `<p>${message}</p>`
    }

  return (
    <Container>
        <div className='message-container'>

        </div>
        <form className='form' onSubmit={handleSubmit}>
            <div className="box"> 
                <input type="text" placeholder='Enter your message' onChange={(e)=>setMessage(e.target.value)}/>
                <button type='submit'>Send</button>
            </div>
            <div className="box">
                <input type="text" placeholder='Join a room'onChange={(e) => setRoom(e.target.value)}/>
                <button type='submit'>Join</button>
            </div>
        </form>
    </Container>
  )
}

const Container = styled.div`
    margin: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .message-container{
        min-height: 70vh;
        width: 50vw;
        border: 1px solid black;
        margin-bottom: 1em;
    }
    .form{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .box{
            margin: 1em;
            input{
                padding: 0.5em;
                margin-right: 1em;
            }
            button{
                padding: 0.5em 2em;
            }
        }
    }

`;   

export default Messagebox;