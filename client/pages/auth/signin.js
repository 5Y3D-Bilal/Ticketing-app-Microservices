import { useState, useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email,
      password
    },
    onSuccess: () => Router.push('/')
  });

  const onSubmit = async event => {
    event.preventDefault();

    await doRequest();
  };


  return (
    <div className='w-full h-screen bg-[rgba(0,0,0,0.7)] flex justify-center items-center'>
      <div className='w-1/3'>
        <form
          onSubmit={onSubmit}
          className="bg-white dark:bg-zinc-900 shadow-lg shadow-white rounded-2xl overflow-hidden border-4 border-blue-400 dark:border-blue-800"
        >
          <div className="px-8 py-10 md:px-10">
            <h2
              className="text-4xl font-extrabold text-center text-zinc-800 dark:text-white"
            >
              Sign in
            </h2>
            <div className="mt-10">
              <div className="relative">
                <label
                  className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
                  for="email"
                >Email</label
                >
                <input
                  placeholder="you@example.com"
                  className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
                  name="email"
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className='text-[10px] text-red-500'>{errors?.map((err) => err.field === 'email' && err.message)}</p>
              </div>
              <div className="mt-6">
                <label
                  className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
                  for="password"
                >Password</label
                >
                <input
                  placeholder="••••••••"
                  className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
                  name="password"
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className='text-[10px] text-red-500'>{errors?.map((err) => err.field === 'password' && err.message)}</p>
              </div>
              <div className="mt-10">
                <button
                  className="w-full px-4 py-3 tracking-wide text-white transition-colors duration-200 transform bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-800"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
          <div className="px-8 py-4 bg-blue-200 dark:bg-zinc-800">
            <div className="text-sm text-blue-900 dark:text-blue-300 text-center">
             Already have an account?
              <a className="font-medium underline" onClick={() => Router.push('auth/signin')}> Sign In</a>
            </div>
          </div>
        </form>
      </div>
    </div>

  );
};
