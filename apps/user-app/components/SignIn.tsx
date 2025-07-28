import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) setError('Invalid credentials');
    else router.push('/home');
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96 space-y-4">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input className="w-full p-2 border rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full p-2 border rounded" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="w-full bg-blue-500 text-white p-2 rounded">Login</button>

        <button onClick={() => signIn('google')} type="button" className="w-full bg-red-500 text-white p-2 rounded">Login with Google</button>
        <button onClick={() => signIn('github')} type="button" className="w-full bg-gray-800 text-white p-2 rounded">Login with GitHub</button>

        <p className="text-center text-sm">
          No account? <a className="text-blue-600" href="/sign-up">Sign up</a>
        </p>
      </form>
    </div>
  );
}
