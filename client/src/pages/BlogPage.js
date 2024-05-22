import Post from '../Post';
import { useEffect, useState } from 'react';

export default function BlogPage(){
    const [posts,setPosts] = useState([]);
    useEffect(() => {
        fetch('https://iemalteria-of.vercel.app/post', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }),
        })
        .then(response => {
            response.json().then(posts => {
                setPosts(posts);
            });
        });
    }, []);
    return (
        <>
            <div className='post-list-container'>
                <div className='post-list'>
                    <h1 className='post-title'>PUBLICACIONES</h1>
                    {posts.length > 0 && posts.map(post => (
                        <Post {...post}/>
                    ))}
                </div>
            </div>
            
            
        </>
    )
}
