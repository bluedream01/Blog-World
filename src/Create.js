import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    const[title, setTitle]=useState('');
    const[body, setBody]=useState('');
    const[author, setAuthor]=useState('mario');
    const[isPending, setIsPending]= useState(false);
    const history=useHistory();

    const handleSubmit=(e)=>{
        e.preventDefault();
        const blog={title,body,author};
        setIsPending(true);
        fetch('http://localhost:8000/blogs',{
            method:'POST',
            headers : {"Content-Type":"application/json"},
            body:JSON.stringify(blog)
        }).then(()=>{
            console.log('new blog added');
            setIsPending(false);
             history.push('/');
        })
        

    }
    return (  
        <div className="create">
            <h2>Add a new blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title:</label>
                <input type ="text" value ={title}
                onChange={(e)=>{
                    setTitle(e.target.value)
                }}
                required />
                <label>Blog body:</label>
                <textarea value ={body}
                onChange={(e)=>{
                    setBody(e.target.value)
                }} required></textarea>
                <label>Blog author:</label>
                <select value={author} onChange={(e)=>{
                  setAuthor(e.target.value)  
                }}> 
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>

                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Pending...</button>}
            </form>
        </div>
    );
}
 
export default Create;