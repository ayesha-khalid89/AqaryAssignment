"use client"

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
interface IPostDetails{
    id:number;
    name:string;
    email:string;
    body:string;
}
const page = () => {
    const {postId}=useParams();
    const [post,setPost]=useState<IPostDetails>();
    async function getServerSideProps() {
        try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${postId}`);
        const data = await response.json();
        console.log(data)
        if(response.ok){
            setPost(data);
        }
    }catch(err){
        console.log(err)
    }
    }
    useEffect(()=>{
        getServerSideProps();
    },[])
  return (
    <main>

        <h1>{postId}</h1>
      <h1>Post Details</h1>
      <br ></br>
      {post && (
        <div key={post.id}>
          <h2>Title: {post.name}</h2>
          <p>Email: {post.email}</p>
          <p>Comments: {post.body}</p>
        </div>
      )}
    </main>
  )
}

export default page