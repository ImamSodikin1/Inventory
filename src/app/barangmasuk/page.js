"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideNavigation from "../../components/sidenavigation/SideNavigation";
import { faHome, faAdd, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../../components/modal/Modal";
import AddBarangMasukForm from "../../components/formaddbarangmasuk/AddBarangMasuk";

const BarangMasuk = () => {
  const [barangMasuk, setBarangMasuk] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectKodeBarangMasuk, setSelectKodeBarangMasuk] = useState("");
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  const fetchDataBarangMasuk = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("api/barangmasuk");
      setBarangMasuk(response.data.data);
      console.log("Berhasil mendapatkan data barang masuk");
    } catch (error) {
      console.log("Gagal mendapatkan data barang masuk:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataBarangMasuk();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      let url = "api/barangmasuk";
      if (searchTerm) {
        url += `/${searchTerm}`;
      }
      const response = await axios.get(url);
      setSearchResult(response.data.data);
      console.log(
        "Berhasil melakukan pencarian data barang masuk",
        response.data.data
      );
    } catch (error) {
      console.log(
        "Gagal melakukan pencarian data barang masuk:",
        error.message
      );
    } finally {
      setIsLoading(false);
    }
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

  // delete barang masuk
  const handleDelete = async (kodeBarang) => {
    try {
      await axios.delete(`api/barangmasuk/${kodeBarang}`);
      fetchDataBarangMasuk();
      console.log("Berhasil delete barang masuk");
    } catch (error) {
      console.log("Gagal delete barang masuk: ", error.message);
    }
  };

  // add barang masuk

  const handleSubmit = async (dataBarangMasuk) => {
    try {
      await axios.post("api/barangmasuk", dataBarangMasuk);
      fetchDataBarangMasuk();
      console.log("Berhasil menambah barang masuk");
    } catch (error) {
      console.log("Error menambah barang masuk: ", error.message);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // handle update barang masuk
  const handleUpdateBarangMasuk = async (updateData) => {
    try {
      await axios.put(`api/barangmasuk/${selectKodeBarangMasuk}`, updateData);
      fetchDataBarangMasuk();
      console.log("Berhasil update data barang masuk");
    } catch (error) {
      console.log("Error update data barang masuk", error.message);
    }
  };

  const openModalUpdate = (kodeBarang) => {
    setSelectKodeBarangMasuk(kodeBarang);
    setIsModalUpdateOpen(true);
  };

  const closeModalUpdate = () => {
    setIsModalUpdateOpen(false);
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
            Add Barang
          </button>

          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <AddBarangMasukForm onSubmit={handleSubmit} />
          </Modal>

          <Modal isOpen={isModalUpdateOpen} onClose={closeModalUpdate}>
            <AddBarangMasukForm onSubmit={handleUpdateBarangMasuk} />
          </Modal>

          {/* Input search */}
          <div className="relative text-gray-500 border border-gray-200 rounded px-2 py-1.5 focus-within:border-blue-200">
            <FontAwesomeIcon
              icon={faSearch}
              className="h-4 w-4"
              onClick={handleSearch}
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
                      Pemasok
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
                        {searchResult.satuan}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {searchResult.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {searchResult.pemasok}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formatDate(searchResult.dataIN)}
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
                    barangMasuk.map((barang) => (
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
                          {barang.pemasok}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {formatDate(barang.dataIN)}
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

export default BarangMasuk;
