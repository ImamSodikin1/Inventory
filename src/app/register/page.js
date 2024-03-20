"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nama: "",
    nik: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [showPopUp, setShowPopUp] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/petugas", formData);
      if (response.status === 400) {
        console.log("Register successfully", response.data);

        setFormData({
          nama: "",
          nik: "",
          password: "",
        });

        setError("Berhasil Register");
        setTimeout(() => {
          setError("");
        }, 2000);
        router.push("/login");
      } else {
        setError("NIK sudah terdaftar");
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (error) {
      setError("Terjadi kesalahan, silahkan coba lagi");
      setTimeout(() => {
        setError("");
      }, 3000);
      console.log("Register failed: ", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col bg-white justify-center items-center w-1/3 h-96 text-gray-500 rounded-tl-lg rounded-bl-lg">
        <h1 className="font-poppins font-medium text-xm">Register</h1>
        <div className="flex flex-col justify-start text-gray-500">
          <label
            htmlFor="nama"
            className="font-poppins font-reguler text-gray-500 mt-3 text-sm"
          >
            username
          </label>
          <input
            type="username"
            id="nama"
            value={formData.nama}
            onChange={handleChange}
            className="border-2 text-gray-500 text-sm font-poppins font-reguler border-slate-500 py-2 px-4 rounded-md focus:outline-none"
            placeholder="user"
          />
          <label
            htmlFor="nik"
            className="font-poppins font-reguler text-gray-500 text-sm mt-3"
          >
            NIK
          </label>
          <input
            id="nik"
            type="text"
            value={formData.nik}
            onChange={handleChange}
            placeholder="1234"
            className="border-2 text-gray-500 border-slate-500 px-4 text-sm py-2 rounded-md focus:outline-none"
          />
          <label
            htmlFor="password"
            className="font-poppins text-gray-500 font-reguler text-sm mt-3"
          >
            password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="font-poppins text-gray-500 font-reguler text-sm border-2 border-slate-500 px-4 py-2 rounded-md focus:outline-none"
            placeholder="****"
          />
          <button
            className="bg-blue-500 hover:bg-yellow-500 text-white font-poppins font-medium text-sm px-4 py-2.5 mt-4 rounded-md"
            onClick={handleSubmit}
          >
            Daftar
          </button>

          {error && (
            <p className="font-poppins font-medium text-sm text-center text-red-500 mt-4">
              {" "}
              {error}{" "}
            </p>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <p className="font-poppins font-reguler text-sm">
            Belum punya akun ?
          </p>
          <Link
            href={"/login"}
            className="font-poppins font-medium text-sm ms-3"
          >
            Login
          </Link>
        </div>
      </div>
      {/* pop up */}

      <div className="flex flex-col items-center w-1/3 h-96 text-gray-500 rounded-tr-lg rounded-br-lg bg-yellow-200">
        <h1 className="font-poppins font-medium mt-12 text-white">
          PT. LG ELECTRONIC
        </h1>
        <Image
          src={"/ic.png"}
          alt="Login"
          width={300}
          height={300}
          className="mt-5 "
        />
      </div>
    </div>
  );
};

export default Register;
