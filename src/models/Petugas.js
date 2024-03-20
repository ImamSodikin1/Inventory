import { kMaxLength } from "buffer";
import mongoose from "mongoose";

const PetugasSchema = new mongoose.Schema(
  {
    nik: {
      type: String,
      required: [true, "NIK harus diisi"],
      unique: true,
      minlength: [4, "NIK harus 4 karakter"],
      minlength: [4, "NIK harus 4 karakter"],
    },
    nama: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Petugas =
  mongoose.models.Petugas || mongoose.model("Petugas", PetugasSchema);

PetugasSchema.statics.findByNik = async function (nik) {
  return await this.findOne({ nik: nik });
};

export default Petugas;
