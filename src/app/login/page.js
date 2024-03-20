"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/api/petugas", { nik, password });
      if (response.status === 200) {
        console.log("Berhasil Login");
        router.push("/");
      } else {
        setError("NIK atau Password Salah");
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (error) {
      console.log("Login gagal: ", error.message);
      setError("Terjadi kesalahan, silahkan coba lagi");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col bg-white justify-center items-center w-1/3 h-96 text-gray-500 rounded-tl-lg rounded-bl-lg">
        <h1 className="font-poppins font-medium">Welcome Back</h1>
        <div className="flex flex-col justify-start">
          <label
            htmlFor="nik"
            className="font-poppins font-medium mt-2 ms-1 text-sm"
          >
            NIK
          </label>
          <input
            type="text"
            id="nik"
            value={nik}
            onChange={(e) => setNik(e.target.value)}
            className="border-2 text-gray-500 text-sm border-gray-500 px-4 py-2 rounded-md focus:outline-none"
            placeholder="12222"
          />
          <label
            htmlFor="password"
            className="font-poppins font-medium mt-4 text-sm"
          >
            password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 text-gray-500 text-sm border-slate-500 px-4 py-2 rounded-md focus:outline-none"
            placeholder="****"
          />
          <div className="flex items-center mt-4">
            <input type="checkbox" id="remember-me" className="mr-2 " />
            <label
              htmlFor="remember-me"
              className="font-poppins font-reguler text-sm text-slate-500"
            >
              Ingat Saya
            </label>
            <Link
              href={"/lupa"}
              className="font-poppins font-reguler text-sm ms-5"
            >
              Lupa Password ?
            </Link>
          </div>
          <button
            className="bg-blue-500 text-white font-poppins font-medium mt-4 px-4 py-2 rounded-md text-sm hover:bg-yellow-400"
            onClick={handleLogin}
          >
            Login
          </button>
          <button className="bg-yellow-500 text-white font-poppins font-medium mt-2 px-4 py-2 rounded-md text-sm hover:bg-blue-500">
            <i className="fab fa-google mr-2 text-sm"></i> Google
          </button>

          {error && (
            <p className="font-poppins font-medium mt-2 text-sm text-red-500">
              {error}
            </p>
          )}

          <div className="flex justify-center mt-4">
            <p className="font-poppins font-reguler text-sm">
              Belum punya akun ?
            </p>
            <Link
              href="/register"
              className="font-poppins font-reguler text-sm ms-1"
            >
              Daftar
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-yellow-200 h-96 w-1/3 items-center rounded-tr-lg rounded-br-lg">
        <h1 className="text-white font-poppins font-semibold mt-10">
          PT. LG ELECTRONIC
        </h1>
        <Image
          src="/ic.png"
          alt="Login"
          width={300}
          height={300}
          className="mt-7"
        />
      </div>
    </div>
  );
};

export default LoginPage;
