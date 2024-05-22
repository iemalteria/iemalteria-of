import Post from '../Post';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function BlogPage(){
    const [posts,setPosts] = useState([]);
    useEffect(() => {
        const axiosInstance = axios.create();

        axiosInstance.interceptors.request.use(
            config => {
                const allowedOrigins = ['https://iemalteria-of.vercel.app/', "http://localhost:3000/"];
                const origin = new URL(config.url).origin;
                if (allowedOrigins.includes(origin)) {
                    // Agregar encabezado personalizado
                    config.headers['Custom-Allow-Origin'] = '*';
                }
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );

        // Realizar la solicitud GET
        axiosInstance.get('https://iemalteria-of.vercel.app/post')
            .then(response => {
                setPosts(response.data);
                console.log(response)
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });

        // Limpiar el interceptor al desmontar el componente
        return () => {
            axiosInstance.interceptors.request.eject(axiosInstance.interceptors.request.handlers.length - 1);
        };
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
