
import { useState } from "react";

const ModalUpdate = ({ isOpen, onCLose, onSubmit, initialData }) => {
  const [updateData, setUpdateData] = useState({
    kodeBarang: initialData ? initialData.kodeBarang : "",
    namaBarang: initialData ? initialData.namaBarang : "",
    jenisBarang: initialData ? initialData.jenisBarang : "",
    stock: initialData ? initialData.stock : 0,
    satuan: initialData ? initialData.satuan : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(updateData);
      isClose();
    } catch (error) {
      console.log("Error update data: ", error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
      <div className="absolute inset-0 bg-blue-500 opacity-50"></div>
      <div className="bg-white rounded-lg p-8 z-10 text-gray-500">
        <div className="flex justify-end">
          <button
            className="text-gray-500 hover:text-yellow-500"
            onClick={onCLose}
          >
            Close
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <input
              type="text"
              name="kodeBarang"
              placeholder="Kode Barang"
              value={updateData.kodeBarang}
              onChange={handleChange}
              className="focus:outline-none border border-gray-200 px-2 py-2 text-sm"
            />
            <input
              type="text"
              name="namaBarang"
              placeholder="Nama Barang"
              value={updateData.namaBarang}
              onChange={handleChange}
              className="focus:outline-none border border-gray-200 px-2 py-2 text-sm"
            />
            <input
              type="text"
              name="jenisBarang"
              placeholder="Jenis Barang"
              value={updateData.jenisBarang}
              onChange={handleChange}
              className="focus:outline-none border border-gray-200 px-2 py-2 text-sm"
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={updateData.stock}
              onChange={handleChange}
              className="focus:outline-none border border-gray-200 px-2 py-2 text-sm"
            />
            <input
              type="text"
              name="satuan"
              placeholder="Satuan"
              value={updateData.satuan}
              onChange={handleChange}
              className="focus:outline-none border border-gray-200 px-2 py-2 text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-yellow-500 text-white text-sm px-3 py-3 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdate;
