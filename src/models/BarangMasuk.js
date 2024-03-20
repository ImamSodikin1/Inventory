import mongoose from "mongoose";

const BarangMasukSchema = new mongoose.Schema(
  {
    kodeBarang: {
      type: String,
    },
    namaBarang: {
      type: String,
    },
    jenisBarang: {
      type: String,
    },
    satuan: {
      type: String,
    },
    code: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    pemasok: {
      type: String,
    },
    dataIN: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.BarangMasuk ||
  mongoose.model("BarangMasuk", BarangMasukSchema);
