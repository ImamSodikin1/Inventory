"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const SideNavigation = () => {
  const [imagePetugas, setImagePetugas] = useState(null);
  const [username, setUsername] = useState("");

  const handleImageChange = (e) => {
    const file = e.tager.file[0];
    setImagePetugas(URL.createObjectURL(file));
  };

  const handleUsername = () => {};

  return (
    <div className="flex flex-col  w-64 bg-white border-2">
      <div className="flex justify-center items-center h-14 w-62 bg-blue-500">
        <h1 className="font-poppins font-medium text-sm">Gudang Material</h1>
        <Image
          src={"/ic-menu.png"}
          width={20}
          height={20}
          alt="menu"
          className="ml-4"
        />
      </div>
      <div className="flex justify-center mt-4  ">
        <Image src={"/ic-profiles.png"} width={30} height={30} />
        <div className="flex flex-col font-poppins text-gray-500 ms-3 text-sm">
          <h2 className="font-medium">Rahmadi</h2>
          <p className="font-reguler">Petugas</p>
        </div>
      </div>
      <div className="flex h-55 w-250 bg-blue-500 px-3 py-2 hover:bg-yellow-500 items-center ms-2 me-2 rounded-md mt-4">
        <Image src={"/ic-home-inven.png"} height={20} width={25} />
        <Link href="/dashboard" className="ms-8">
          Dashboard
        </Link>
      </div>
      <div className="flex flex-col text-gray-500 mt-5 ms-4 me-2 text-sm ">
        <p className="font-medium">Master</p>
        <div className="flex justify-start ms-3 mt-2 items-center">
          <Image src={"/barang_inven.png"} width={20} height={20} />
          <Link href="/" className="ms-3 tex-sm hover:text-yellow-500">
            Barang
          </Link>
        </div>
      </div>
      <div className="flex flex-col text-gray-500 mt-8 ms-4 me-2 text-sm">
        <p className="font-medium">Transaksi</p>
        <div className="flex items-center ms-2 mt-2">
          <Image src={"/barang_in.png"} width={20} height={20} />
          <Link href="/barangmasuk" className="ms-2 hover:text-yellow-500">
            Barang Masuk
          </Link>
        </div>
        <div className="flex items-center ms-2 mt-3">
          <Image src={"/barang_in.png"} width={20} height={20} />
          <Link href="/chart" className="ms-2 hover:text-yellow-500">
            Barang Keluar
          </Link>
        </div>
      </div>
      <div className="flex flex-col text-sm text-gray-500 ms-4 me-2 mt-8">
        <p className="font-medium">Laporan</p>
        <div className="flex items-center ms-2 mt-3">
          <Image src={"/report_in.png"} width={20} height={20} />
          <Link href={"/chart"} className="ms-2 hover:text-yellow-500">
            Chart
          </Link>
        </div>
        <div className="flex items-center ms-2 mt-3">
          <Image src={"/report_out.png"} width={20} height={20} />
          <Link
            href="#"
            className="text-sm font-reguler ms-2 hover:text-yellow-500"
          >
            Laporan Barang Keluar
          </Link>
        </div>
      </div>
      <div className="flex flex-col text-gray-500 text-sm ms-4 me-2 mt-10">
        <p className="font-medium">Managemen User</p>
        <div className="flex items-center ms-2 mt-3">
          <Image src={"/manage_user.png"} width={20} height={20} />
          <Link
            href="#"
            className="text-sm font-reguler ms-2 hover:text-yellow-500"
          >
            Laporan Barang Keluar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideNavigation;
