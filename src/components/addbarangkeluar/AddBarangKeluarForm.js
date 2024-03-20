import { useState } from "react";

const AddBarangKeluarForm = ({ onSubmit }) => {
  const [quantity, setQuantity] = useState(0);
  const [code, setCode] = useState("");
  const [penerima, setPenerima] = useState("");
 

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      quantity,
      code,
      penerima,
    });

    setQuantity(0);
    setCode("");
    setPenerima("");
  };

  return (
    <div className="border border-gray-200 rounded p-4 mt-4 text-gray-500 text-sm">
      <h2 className="text-lg font-medium nb-4">Tambah Barang Keluar</h2>
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
          placeholder="Penerima"
          value={penerima}
          className="focus:outline-none border border-gray-200 rounded px-2 py-2 ms-2"
          onChange={(e) => setPenerima(e.target.value)}
        />
        <button className="bg-blue-500 hover:bg-yellow-500 rounded text-sm font-medium text-white ms-2 px-4 py-3 "
        type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBarangKeluarForm;
