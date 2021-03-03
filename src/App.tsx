import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import { posts } from './types/posts'
import { Usuarios } from './types/usuarios'

function App() {

  const [usuarios, setUsuarios] = useState<Usuarios[]>([])
  const [id, setId] = useState<Number>(0)
  const [posts, setPosts] = useState<posts[]>([])


  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users/')
      .then(resposta => setUsuarios(resposta.data))
  }, [])

  useEffect(()=> {
    if(id !== 0) {
      axios.get(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
      .then(resposta => setPosts(resposta.data))
    }
  }, [id])



  return (
    <div className="App">
      <h2>Usuários</h2>
      <ul>
        {
          usuarios !== null && 
          usuarios.map((item: Usuarios) => (
            <li key={item.id} onClick={() => setId(item.id)}>
              {item.name} - {item.id}
            </li>
          ))
        }
      </ul>
      <h2>Posts</h2>
      <ul>
        { 
          posts.map((item: posts) => (
            <li key={item.id}>{item.title} - {item.userId}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
