import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CompanySignup = () => {
  let nameRef = useRef();
  let emailRef = useRef();
  let passwordRef = useRef();

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let obj = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      role: 'company',
    };

    console.log(obj);
    try {
      let res = await fetch('https://job-backend-lnzw.onrender.com/users/create', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(obj),
      });

      let data = await res.json();
      console.log(data);
      if (data.success) {
        navigate('/login');
        toast.success(data.msg, { position: 'top-left' });
      } else {
        toast.error(data.msg, { position: 'top-left' });
      }
    } catch (error) {
      toast.error('server error', { position: 'top-left' });
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-gray-100">
      <section className="relative flex flex-wrap items-center justify-center lg:h-screen">
        {/* Left section with form */}
        <div className="w-full lg:w-1/2 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">Welcome to the Employee Portal</h1>
            <p className="mt-4 text-gray-500">Manage your account and access your resources easily.</p>
          </div>

          {/* Form */}
          <form className="mx-auto mt-8 max-w-md space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                ref={nameRef}
                type="text"
                id="name"
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Enter name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                ref={emailRef}
                type="email"
                id="email"
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Enter email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                ref={passwordRef}
                type="password"
                id="password"
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Enter password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Already have an account?{' '}
                <Link className="underline" to="/login">Log in</Link>
              </p>
              <button
                type="submit"
                className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>

        {/* Right section with image */}
        <div className="relative w-full lg:w-1/2">
          <img
            alt="Company Signup"
            src="https://pikaso.cdnpk.net/private/production/1321991482/render.jpeg?token=exp=1736208000~hmac=a900207fc401799c914ef4641ac87ca9f502d7fe2c4fb513374379903dadc6da"
            className="w-full h-72 sm:h-96 lg:h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>
    </div>
  );
};

export default CompanySignup;
