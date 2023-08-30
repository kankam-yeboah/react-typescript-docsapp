import {useEffect, useCallback,FC} from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { io } from 'socket.io-client'

const TextEditor:FC = () => {
    useEffect(()=>{
        const socket = io('http://localhost:3001');

        return ()=>{
            socket.disconnect()
        }
    },[])


    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
      
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
      
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
      
        ['clean']                                         // remove formatting button
      ];

    const WrapperRef = useCallback((wrapper:HTMLElement | null) => {
        if(wrapper == null) return
        wrapper.innerHTML = ''
        const editor = document.createElement('div')
        wrapper.append(editor)
        new Quill(editor,{theme:'snow',modules:{toolbar: toolbarOptions} })
    },[])

  return (
    <div className='container' ref={WrapperRef}></div>
  )
}

export default TextEditor