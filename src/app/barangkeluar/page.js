"use client";

import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import SideNavigation from "../../components/sidenavigation/SideNavigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/modal/Modal";
import AddBarangKeluarForm from "../../components/addbarangkeluar/AddBarangKeluarForm";

const BarangKeluar = () => {
  const [barangKeluar, setBarangKeluar] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalUpdate, setIsModalUpdate] = useState(false);
  const [selectKodeBarangKeluar, setSelectKodeBarangKeluar] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [seacrhResult, setSearchResult] = useState(null);

  const fecthDataBarangKeluar = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("api/barangkeluar");
      setBarangKeluar(response.data.data);
      console.log("Berhasil get data barang keluar");
    } catch (error) {
      console.log("Error get data barang keluar: ", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fecthDataBarangKeluar();
  }, []);

  // handle  add barang keluar
  const handleAddBarangKeluar = async (data) => {
    try {
      await axios.post("/api/barangkeluar", data);
      fecthDataBarangKeluar();
      console.log("Berhasil menambahkan data barang keluar");
    } catch (error) {
      console.log("Error menamabahkan data barang keluar");
    }
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  // handle update barang keluar
  const handleUpdateBarangKeluar = async (data) => {
    try {
      await axios.put(`api/barangkeluar/${selectKodeBarangKeluar}`, data);
      fecthDataBarangKeluar();
      console.log("berhasil update data barang keluar");
    } catch (error) {
      console.log("Error update data barang keluar", error.message);
    }
  };

  const openModalUpdate = (kodeBarang) => {
    setSelectKodeBarangKeluar(kodeBarang);
    setIsModalUpdate(true);
  };

  const closeModalUpdate = () => {
    setIsModalUpdate(false);
  };

  // handle seacrh
  const handleSeacrh = async () => {
    setIsLoading(true);
    try {
      let url = "api/barangkeluar";
      if (searchTerm) {
        url += `/${searchTerm}`;
      }
      const response = await axios.get(url);
      setSearchResult(response.data.data);
      console.log("Berhasil pencarian data barang keluar");
    } catch (error) {
      console.log("Error serach barang keluar: ", error.message);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Format tanggal menjadi "dd/mm/yyyy"
  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };
  // delete barang keluar
  const handleDelete = async (kodeBarang) => {
    try {
      await axios.delete(`api/barangkeluar/${kodeBarang}`);
      fecthDataBarangKeluar();
      console.log("Berhasil delete barang masuk");
    } catch (error) {
      console.log("Gagal delete barang masuk: ", error.message);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex">
        <SideNavigation />
      </div>

      {/* Barang masuk */}
      <div className="flex flex-col w-full bg-white">
        <div className="flex text-white text-sm h-55 bg-blue-500 px-4 py-4  border border-white items-center">
          <FontAwesomeIcon icon={faHome} width={25} />
          <p className="ms-3 mt-1">Barang Masuk</p>
        </div>
        <div className="flex justify-between mx-auto w-[980px] mt-3">
          <button
            className="bg-yellow-500 hover:bg-blue-500 text-white rounded flex px-2 py-2 text-sm items-center font-medium"
            onClick={openModal}
          >
            <FontAwesomeIcon icon={faAdd} width={15} className="mr-1" />
            Add Barang Keluar
          </button>

          <Modal isOpen={isOpenModal} onClose={closeModal}>
            <AddBarangKeluarForm onSubmit={handleAddBarangKeluar} />
          </Modal>

          <Modal isOpen={isOpenModalUpdate} onClose={closeModalUpdate}>
            <AddBarangKeluarForm onSubmit={handleUpdateBarangKeluar} />
          </Modal>

          {/* Input search */}
          <div className="relative text-gray-500 border border-gray-200 rounded px-2 py-1.5 focus-within:border-blue-200">
            <FontAwesomeIcon
              icon={faSearch}
              className="h-4 w-4"
              onClick={handleSeacrh}
              cursor={"pointer"}
            />
            <input
              type="text"
              maxLength={6}
              value={searchTerm}
              className="focus:outline-none ms-2 text-sm"
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Tabel */}
        <div className="flex justify-center text-gray-500 text-sm font-reguler">
          <div className="flex flex-col border border-gray-200 w-[980px] h-[500px] m-5 rounded overflow-x-hidden overflow-y-auto items-center">
            <div>
              <table className="text-sm ms-2 mt-2 me-2">
                <thead className="bg-blue-500 text-white rouded border border-white sticky top-0">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider sticky top-0 rounded-tl rounded-bl">
                      Kode Barang
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider sticky top-0">
                      Nama Barang
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider sticky top-0">
                      Jenis Barang
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider sticky top-0">
                      Satuan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider sticky top-0">
                      Qty
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider sticky top-0">
                      Penerima
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider sticky top-0 rounde-tr rounde-br">
                      Date in
                    </th>
                    <th className=" text-center px-6 py-3 text-xs font-medium uppercase tracking-wider sticky top-0 rounde-tr rounde-br">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Tampilkan hasil pencarian jika ada */}
                  {isLoading ? (
                    // Menampilkan loading spinner jika sedang memuat data
                    <tr>
                      <td colSpan="8" className="text-center py-4">
                        <div className="flex items-center justify-center">
                          <div className="w-6 h-6 border-b-2 border-t-2 border-blue-500 rounded-full animate-spin"></div>
                        </div>
                      </td>
                    </tr>
                  ) : seacrhResult !== null ? (
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {seacrhResult.kodeBarang}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {seacrhResult.namaBarang}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {seacrhResult.jenisBarang}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {seacrhResult.satuan}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {seacrhResult.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {seacrhResult.penerima}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formatDate(seacrhResult.dataOUT)}
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
                    // Tampilkan data barang masuk jika tidak melakukan pencarian atau hasil pencarian tidak ditemukan
                    barangKeluar.map((barang) => (
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
                          {barang.satuan}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {barang.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {barang.penerima}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {formatDate(barang.dataOUT)}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarangKeluar;
