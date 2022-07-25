import "./Login.css";
import React, { useState } from 'react'

const Login = () => {
    const [checkpoint, setChcekpoint] = useState(false); // 로그인 관련
    const [name,setName] = useState(""); //로그인 관련 2
    const [inputTitle,setinputTitle] = useState("")
    const [content,setContent] = useState([
        {
            id: 1,
            text:"밥",
            subText:"밥먹기",
            completed : false
        },
    ])
    
    const [inputContent,setinputContent] = useState("")
    // const [text1, setText1] = useState(".done");
    // const [text2, setText2] = useState(".working");

    const nameSetFunc = (e) =>{     // 로그인 관련 1
        setName(e.target.value);
    }
    const addProfile = (e) => {     // 로그인 관련 2
        e.preventDefault();
        if(name===""){
          alert("이름을 입력하거라")
          return
        }
        else{
          setName("")
          alert(name+" 이여 ..... 사용을 허가한다.")
          setChcekpoint(!checkpoint)
        }
    }
    const titleTodos = (e) =>{
        setinputTitle(e.target.value);
    }
    const contentTodos = (e) => {
        setinputContent(e.target.value);
    }
    const submitTodos = (e) =>{
        e.preventDefault();
        if(inputContent==="" || inputTitle===""){
            alert("둘 다 작성해야 한다.")
            return
        }
        setContent([...content,
            {text:inputContent,id:Math.random()*1000,completed:false,subText:inputTitle}
        ])
        setinputTitle("");
        setinputContent("");
        
    }
    function deleteTodos(id){
        setContent(
            content.filter((contents)=>contents.id !== id)
        )
    }
    function completeTodos(completed,id){
        setContent(content.map((contents)=>(
            contents.id === id ? {...contents, completed: !contents.completed} : contents
        )))
        // setText2(text1);
    }
    function cancelTodos(completed,id){
        setContent(content.map((contents)=>(
            contents.id === id ? {...contents, completed: !contents.completed} : contents
        )))
        // setText1(text2);
    }
  return (

    <div className='container'>
        <h1>내 버킷 리스트</h1>
        <form className="todo-form" style={{display: checkpoint===false ? "inline" : "none"}}>
            <input value={name} onChange={nameSetFunc} placeholder="이름을 쓰거라"></input>
            <button type='submit' onClick={addProfile}>제1출</button>
        </form>
        <div className={`profile ${checkpoint ? "todo-active" : "todo-none"}`}>
            <form>
                <input value={inputTitle} onChange={titleTodos} placeholder="제목을 적거라" className='todo-get' type="text"></input>
                <input value={inputContent} onChange={contentTodos} placeholder="할 일을 적거라" className='todo-get' type="text"></input>
                <button type='submit' onClick={submitTodos}>제2출</button>
            </form>
            <hr className='line'></hr>
            <div className='working'>Working !
                {content.map((contents) => (
                    <div className={`todo-item ${contents.completed ? "uncompleted" : "completed"}`} key={contents.id}>할일 : {contents.text}
                        <div>코멘트 : {contents.subText}</div>
                        <button onClick={()=>deleteTodos(contents.id)}>삭제</button>
                        <button className={contents.completed ? "uncompleted" : "completed"} onClick={contents.completed ? ()=>cancelTodos(contents.completed,contents.id) : ()=>completeTodos(contents.completed,contents.id)}>{contents.completed ? "취소" : "완료"}</button>
                    </div>
                ))}
            </div>
            <div className='done'>Done !
                {content.map((contents) => (
                    <div className={`todo-item ${contents.completed ? "completed" : "uncompleted"}`} key={contents.id}>할일 : {contents.text}
                        <div>코멘트 : {contents.subText}</div>
                        <button onClick={()=>deleteTodos(contents.id)}>삭제</button>
                        <button onClick={contents.completed ? ()=>cancelTodos(contents.completed,contents.id) : ()=>completeTodos(contents.completed,contents.id)}>{contents.completed ? "취소" : "완료"}</button>
                    </div>
                ))}
            </div>
        </div>
        
    </div>
  )
}

export default Login