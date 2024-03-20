"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  faAdd,
  faBox,
  faSearch,
  faSync,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddBarangForm from "../addbarang/AddBarangForm";
import Modal from "../modal/Modal";
import UpdateBarangForm from "../updatebarang/UpdateBarang";

const Dashboard = () => {
  const [allBarangs, setAllBarangs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [selectKodeBarang, setSelectKodeBarang] = useState("");
  const [jumlahJenisBarang, setJumlahJenisBarang] = useState(0);
  const [jumlahSatuanBarang, setJumlahSatuanBarang] = useState(0);
  const [jumlahKodeBarang, setJumlahKodeBarang] = useState(0);

  const fetchDataBarangs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("api/barang");
      setAllBarangs(response.data.data);
      console.log("Success fetch all data barang", response.data.data);

      // menghitung jenis barang
      const uniqueJenisBarang = new Set(
        response.data.data.map((barang) => barang.jenisBarang)
      );
      setJumlahJenisBarang(uniqueJenisBarang.size);

      // menghitung satuan barang
      const uniqueSatuanBarang = new Set(
        response.data.data.map((barang) => barang.satuan)
      );
      setJumlahSatuanBarang(uniqueSatuanBarang.size);

      // menghitung jumlah jenis kode barang
      const uniqueKodeBarang = new Set(
        response.data.data.map((barang) => barang.kodeBarang)
      );
      setJumlahKodeBarang(uniqueKodeBarang.size);
    } catch (error) {
      console.log("Error fetching all data barang: ", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataBarangs();
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      let url = "api/barang";
      if (searchTerm) {
        url += `/${searchTerm}`;
      }
      const response = await axios.get(url);
      setSearchResult(response.data.data);
      console.log("Success fetch search result", response.data.data);
    } catch (error) {
      console.log("Error fetching search result: ", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (kodeBarang) => {
    try {
      await axios.delete(`api/barang/${kodeBarang}`);
      fetchDataBarangs();
      console.log("Succes delete barang");
    } catch (error) {
      console.log("Error delete barang : ", error.message);
    }
  };

  const handleRefresh = () => {
    setSearchTerm("");
    setSearchResult(null);
    fetchDataBarangs();
  };

  const handleSubmit = async (dataBarang) => {
    try {
      await axios.post("api/barang", dataBarang);
      fetchDataBarangs();
      console.log("Succes create new  Barang");
    } catch (errpr) {
      console.log("Error create new Barang: ", error.message);
    }
  };

  const handleSerachChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // modal update
  const handleUpdateBarang = async (updateDataBarang) => {
    try {
      await axios.put(`api/barang/${selectKodeBarang}`, updateDataBarang);
      fetchDataBarangs();
      console.log("Successfuly update barang");
    } catch (error) {
      console.log("Error update barang: ", error.message);
    }
  };

  const openModalUpdate = (kodeBarang) => {
    setSelectKodeBarang(kodeBarang);
    setIsModalUpdateOpen(true);
  };

  const closeModalUpdate = () => {
    setIsModalUpdateOpen(false);
  };

  return (
    <div className="flex flex-col h-svh bg-white">
      <div className="flex text-white text-sm h-55 bg-blue-500 px-4 py-4 items-center border border-white">
        <Image src={"/ic-home-inven.png"} width={20} height={25} />
        <p className="ms-3">Dashboard</p>
      </div>
      {/* menu atas */}

      {/* menu kedua */}
      <div className="flex justify-center mt-2">
        <div className="flex justify-between space-x-4 mx-auto h-24 w-3/4">
          {/* jenis barang */}
          <div className="flex justify-center items-center h-[70px] border w-[220px] border-gray-200 px-3 py-3 rounded">
            <Image src={"/ic-jenis-barang.png"} width={40} height={20} />
            <div className="flex flex-col text-gray-500 text-sm font-reguler ms-4">
              <p>Jenis Barang</p>
              <p>{jumlahJenisBarang}</p>
            </div>
          </div>
          <div className="flex justify-center items-center h-[70px] border w-[220px] border-gray-200 px-3 py-3 rounded">
            <Image src={"/ic-satuan.png"} width={40} height={20} />
            <div className="flex flex-col text-gray-500 text-sm font-reguler ms-4">
              <p>Satuan Barang</p>
              <p>{jumlahSatuanBarang}</p>
            </div>
          </div>
          <div className="flex justify-center items-center h-[70px] border w-[220px] border-gray-200 px-3 py-3 rounded">
            <Image src={"/ic-coes.png"} width={40} height={20} />
            <div className="flex flex-col text-gray-500 text-sm font-reguler ms-4">
              <p>Code Barang</p>
              <p>{jumlahKodeBarang}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mb-2 mx-auto w-3/4">
        <div>
          <button
            className="bg-blue-500 hover:bg-yellow-500 px-3 py-2 rounded text-sm"
            onClick={openModal}
          >
            <FontAwesomeIcon
              icon={faAdd}
              className="h-4 w-4 me-2"
              color="white"
            />
            Add Barang
          </button>
          {/* modal */}
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <AddBarangForm onSubmit={handleSubmit} />
          </Modal>
          <Modal isOpen={isModalUpdateOpen} onClose={closeModalUpdate}>
            <UpdateBarangForm onSubmit={handleUpdateBarang} />
          </Modal>
        </div>
        <div className="relative text-gray-500 border border-gray-200 px-2 py-1.5 rounded focus-within:text-gray-500 ">
          <span>
            <FontAwesomeIcon
              icon={faSearch}
              className="h-4 w-4"
              onClick={handleSearch}
              cursor={"pointer"}
            />
          </span>
          <input
            type="text"
            placeholder="Kode Barang"
            className="focus:outline-none ms-2 text-sm"
            maxLength={6}
            value={searchTerm}
            onChange={handleSerachChange}
          />
        </div>
      </div>
      {/* table */}
      <div className="flex justify-center text-gray-500 text-sm font-reguler mb-7">
        <div className="flex flex-col border border-gray-200  w-[820px] rounded h-[390px] overflow-x-hidden overflow-y-auto ">
          <div>
            <table className="w-[800px] divide-y divide-gray-200 mt-2 ms-2 me-4">
              <thead className="border border-gray-200 bg-blue-500 text-white  sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider sticky top-0">
                    Kode Barang
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider sticky top-0">
                    Nama Barang
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider  sticky top-0">
                    Jenis Barang
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider  sticky top-0">
                    Stok
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider  sticky top-0">
                    Satuan
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider w-32  sticky top-0">
                    Actions
                  </th>
                  <th>
                    <button onClick={handleRefresh}>
                      <FontAwesomeIcon icon={faSync} className="mr-8"/>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 overflow-x-hidden overflow-y-auto">
                {isLoading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      <div className="flex items-center justify-center">
                        <div className="w-6 h-6 border-b-2 border-t-2 border-blue-500 rounded-full animate-spin"></div>
                      </div>
                    </td>
                  </tr>
                ) : searchResult !== null ? (
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {searchResult.kodeBarang}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {searchResult.namaBarang}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {searchResult.jenisBarang}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {searchResult.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {searchResult.satuan}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <button className="bg-yellow-500 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded">
                        Update
                      </button>
                      <button className="bg-blue-500 hover:bg-yellow-500 text-white text-sm font-medium py-2 px-5 ms-2 rounded">
                        Delete
                      </button>
                    </td>
                  </tr>
                ) : (
                  allBarangs.map((barang) => (
                    <tr key={barang.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {barang.kodeBarang}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {barang.namaBarang}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {barang.jenisBarang}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {barang.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {barang.satuan}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <button
                          className="bg-yellow-500 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded"
                          onClick={() => openModalUpdate(barang.kodeBarang)}
                        >
                          Update
                        </button>
                        <button
                          className="bg-blue-500 hover:bg-yellow-500 text-white text-sm font-medium py-2 px-5 ms-2 rounded"
                          onClick={() => handleDelete(barang.kodeBarang)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {/* render modal update data */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
