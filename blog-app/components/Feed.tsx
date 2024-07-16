"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

interface IPost{
    id:number;
    title:string;
    body:string;
}

const Feed = () => {
    const [posts,setPosts]=useState<IPost[]>();
    async function getServerSideProps() {
        try{
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();
        if(response.ok){
            setPosts(data);
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
      <h1 style={{textAlign:'center'}}>A List of Blog Posts</h1>
      <br ></br>
      {posts && posts?.map((post) => (
        <Link href={`posts/${post.id}`} key={post.id} style={{textAlign:'center'}}>
          <h2>Title: {post.title}</h2>
          <p>Content: {post.body}</p>
        </Link>
      ))}
    </main>
  )
}

export default Feed