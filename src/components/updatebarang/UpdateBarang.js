const { useState } = require("react");

const UpdateBarangForm = ({ onSubmit }) => {
  const [kodeBarang, setKodeBarang] = useState("");
  const [namaBarang, setNamaBarang] = useState("");
  const [jenisBarang, setJenisBarang] = useState("");
  const [stock, setStock] = useState(0);
  const [satuan, setSatuan] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      kodeBarang,
      namaBarang,
      jenisBarang,
      stock,
      satuan,
    });

    setKodeBarang("");
    setNamaBarang("");
    setJenisBarang("");
    setStock(0);
    setSatuan("");
  };
  return (
    <div className="border border-gray-200 rounded p-4 mt-4 text-gray-500 text-sm">
      <h2 className="text-lg font-medium mb-2">Update Barang Baru</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields for barang data */}
        <input
          type="text"
          placeholder="Kode Barang"
          value={kodeBarang}
          maxLength={6}
          className="focus:outline-none border border-gray-200 rounded px-2 py-2"
          onChange={(e) => setKodeBarang(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nama Barang"
          value={namaBarang}
          className="focus:outline-none border border-gray-200 rounded px-2 py-2 ms-2"
          onChange={(e) => setNamaBarang(e.target.value)}
        />
        {/* Tambahan input fields untuk jenis barang, stock, dan satuan */}
        <input
          type="text"
          placeholder="Jenis Barang"
          value={jenisBarang}
          className="focus:outline-none border border-gray-200 rounded px-2 py-2 ms-2"
          onChange={(e) => setJenisBarang(e.target.value)}
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          className="focus:outline-none border border-gray-200 rounded px-2 py-2 ms-2"
          onChange={(e) => setStock(e.target.value)}
        />
        <input
          type="text"
          placeholder="Satuan"
          value={satuan}
          className="focus:outline-none border border-gray-200 rounded px-2 py-2 ms-2"
          onChange={(e) => setSatuan(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-yellow-500 px-3 py-2 rounded text-sm text-white ms-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateBarangForm;
