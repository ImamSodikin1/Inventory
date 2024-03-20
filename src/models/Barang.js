import mongoose from "mongoose";

const BarangScema = new mongoose.Schema(
  {
    kodeBarang: {
      type: String,
      unique: true,
    },
    namaBarang: {
      type: String,
    },
    jenisBarang: {
      type: String,
    },
    stock: {
      type: Number,
    },
    satuan: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Barang = mongoose.models.Barang || mongoose.model("Barang", BarangScema);

BarangScema.statics.findByKodeBarang = async function (kodeBarang) {
  return await this.findOne({ kodeBarang: kodeBarang });
};

export default Barang;
