import {useState,useEffect} from 'react';
import { io, Socket} from "socket.io-client";

export default function useConnectClient():Socket | null {
    const [client, setClient] = useState<Socket| null>(null);
    
    useEffect(() => {
        const s:Socket = io('http://localhost:3001');
        setClient(s);
        return ()=>{
          s.disconnect()
        }
    }, []);
    
    return client;
}