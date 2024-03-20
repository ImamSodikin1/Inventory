import { useState } from "react";

const AddBarangMasukForm = ({ onSubmit }) => {
  const [quantity, setQuantity] = useState(0);
  const [code, setCode] = useState("");
  const [pemasok, setPemasok] = useState("");
 

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      quantity,
      code,
      pemasok,
    });

    setQuantity(0);
    setCode("");
    setPemasok("");
  };

  return (
    <div className="border border-gray-200 rounded p-4 mt-4 text-gray-500 text-sm">
      <h2 className="text-lg font-medium nb-4">Tambah Barang Masuk</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          className="focus:outline-none border border-gray-200 rounded px-2 py-2"
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Code"
          value={code}
          className="focus:outline-none border border-gray-200 rounded px-2 py-2 ms-2"
          onChange={(e) => setCode(e.target.value)}
        />
        <input
          type="text"
          placeholder="Pemasok"
          value={pemasok}
          className="focus:outline-none border border-gray-200 rounded px-2 py-2 ms-2"
          onChange={(e) => setPemasok(e.target.value)}
        />
        <button className="bg-blue-500 hover:bg-yellow-500 rounded text-sm font-medium text-white ms-2 px-4 py-3 "
        type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBarangMasukForm;
