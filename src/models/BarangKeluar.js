import mongoose from "mongoose";

const BarangKeluarSchema = new mongoose.Schema(
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
      required: true,
    },
    penerima: {
      type: String,
    },
    dataOUT: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.BarangKeluar ||
  mongoose.model("BarangKeluar", BarangKeluarSchema);
