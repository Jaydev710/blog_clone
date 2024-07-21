// import {useState} from "react";

// export default function RegisterPage() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   async function register(ev) {
//     ev.preventDefault();
//     const response = await fetch('http://localhost:4000/register', {
//       method: 'POST',
//       body: JSON.stringify({username,password}),
//       headers: {'Content-Type':'application/json'},
//     });
//     if (response.status === 200) {
//       alert('registration successful');
//       console.log(response);
//     } else {
//       alert('registration failed');
//       console.log(response);
//     }
//   }
//   return (
//     <form className="register" onSubmit={register}>
//       <h1>Register</h1>
//       <input type="text"
//              placeholder="username"
//              value={username}
//              onChange={ev => setUsername(ev.target.value)}/>
//       <input type="password"
//              placeholder="password"
//              value={password}
//              onChange={ev => setPassword(ev.target.value)}/>
//       <button>Register</button>
//     </form>
//   );
// }
import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function register(ev) {
    ev.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Registration successful');
        console.log(data);
      } else {
        const errorData = await response.json();
        setMessage(`Registration failed: ${errorData.error || response.statusText}`);
        console.error('Registration failed:', response.status, response.statusText);
      }
    } catch (error) {
      setMessage('Registration failed: ' + error.message);
      console.error('Fetch error:', error);
    }
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={ev => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={ev => setPassword(ev.target.value)}
      />
      <button type="submit">Register</button>
      {message && <p>{message}</p>}
    </form>
  );
}
