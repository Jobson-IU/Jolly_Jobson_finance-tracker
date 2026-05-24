import React, { useState } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

function Register() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const registerUser = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert(
        "Registration successful!"
      );

      window.location.href = "/";

    } catch (error) {

      alert(
        "Registration failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

      <div className="bg-slate-900 p-10 rounded-3xl shadow-2xl w-full max-w-md">

        <h1 className="text-4xl font-bold text-white mb-2 text-center">
          Create Account
        </h1>

        <p className="text-gray-400 text-center mb-8">
          Register to continue
        </p>

        <form
          onSubmit={registerUser}
          className="space-y-6"
        >

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 py-4 rounded-xl font-bold hover:scale-105 transition duration-300"
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>

        </form>

        <p className="text-gray-400 mt-6 text-center">

          Already have an account?

          <Link
            to="/"
            className="text-blue-400 ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;