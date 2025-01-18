"use client";

import { useState } from "react";
import { loginUser } from "../libs/apis/server";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setemailError] = useState("");
  const [passwordError, setpasswordError] = useState("");

  const ValidationFrom = () => {
    setemailError("");
    setpasswordError("");

    if (!email) {
      setemailError("email is required");
      return false;
    }
    if (!password) {
      setpasswordError("password is required");
      return false;
    }
    return true;
  };

  const handSubmit = async (e) => {
    e.preventDefault();

    const isValid = ValidationFrom();

    if (isValid) {
      const login = await loginUser({ email: email, password: password });

      console.log("LOGIN RESPONSE", login);
    }
  };

  return (
    <div className="w-[380px] mx-auto">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4">
        <form onSubmit={handSubmit} className="space-y-6">
          <h3 className="text-center font-bold text-gray-900">
            Sign in to Kismore Product
          </h3>

          <div>
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-900 block mb-2"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border focus:border-blue-200 border-gray-300 focus:ring-1 rounded-lg focus:ring-offset-2 focus:ring-blue-500 text-gray-900 block w-full p-2.5"
              placeholder="example@email.com"
            />
            {emailError && (
              <div className="text-red-600 text-xs mt-3">{emailError}</div>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-900 block mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border focus:border-blue-200 border-gray-300 focus:ring-1 rounded-lg focus:ring-offset-2 focus:ring-blue-500 text-gray-900 block w-full p-2.5"
              placeholder="Your password"
            />
            {passwordError && (
              <div className="text-red-600 text-sm mt-3">{passwordError}</div>
            )}
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                className="bg-gray-50 border-gray-300 focus:ring-4 focus:ring-blue-400 h-4 w-4"
              />
            </div>
            <label
              htmlFor="remember"
              className="ml-3 font-normal text-gray-900"
            >
              Remember me
            </label>
            <a
              href="/forgot-password"
              className="text-sm text-blue-700 font-semibold hover:underline ml-auto"
            >
              Forget password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5"
          >
            Sign in
          </button>

          <div className="flex justify-center font-medium text-gray-500 text-sm space-x-2">
            <span>Don't have an account?</span>
            <a href="/register" className="text-blue-400 hover:underline">
              Create an account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
