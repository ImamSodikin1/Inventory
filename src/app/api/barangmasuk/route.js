import BarangMasuk from "../../../models/BarangMasuk";
import connectDB from "../../../utils/mongoose";
import Barang from "../../../models/Barang";
import { status } from "express/lib/response";

export async function POST(request) {
  await connectDB();
  try {
    const body = await request.json();
    const quantity = body.quantity;
    const code = body.code;
    const pemasok = body.pemasok;

    const barang = await Barang.findOne({ kodeBarang: code });
    console.log(pemasok);

    if (!barang) {
      console.log("Barang Not Found", code);
      return Response.json({
        message: "Barang Not Found",
        status: 404,
      });
    }

    barang.stock = parseInt(barang.stock) + parseInt(quantity);

    barang.save();

    const newBarangMasuk = new BarangMasuk({
      kodeBarang: barang.kodeBarang,
      namaBarang: barang.namaBarang,
      jenisBarang: barang.jenisBarang,
      satuan: barang.satuan,
      code: barang.code,
      quantity: parseInt(quantity),
      pemasok: pemasok,
    });

    const saveBarangMasuk = await newBarangMasuk.save();
    console.log("Succes create new barang masuk", saveBarangMasuk);
    return Response.json({
      message: "Succes creae new barang masuk",
      status: 200,
      data: saveBarangMasuk,
    });
  } catch (error) {
    console.log("Error create new barang masuk");
    return Response.json({
      error: error.message,
      status: 400,
    });
  }
}

export async function GET() {
  await connectDB();
  try {
    const barangMasuk = await BarangMasuk.find();

    if (!barangMasuk) {
      console.log("Barang masuk Not Found");
      return Response.json({
        message: "Barang masuk Not Found",
        status: 404,
      });
    }
    console.log("Success get all barang masuk", barangMasuk);
    return Response.json({
      message: "Succes get all barang masuk",
      status: 200,
      data: barangMasuk,
    });
  } catch (error) {
    console.log("Error get all barang masuk: ", error.message);
    return Response.json({
      error: error.message,
      status: 400,
    });
  }
}

// export async function GET(req, res) {
//   await connectDB();
//   try {
//     const barangMasuk = await BarangMasuk.find();

//     if (!barangMasuk) {
//       console.log("barang masuk not found");
//       return res.status(404).json({
//         message: "barang masuk not found",
//         status: 404,
//       });
//     }
//     console.log("Berhasil get barng masuk");
//     return res.status(200).json({
//       message: "Succes get all barang masuk",
//       status: 200,
//       data: barangMasuk,
//     });
//   } catch (error) {
//     console.log("error get barang masuk", error.message);
//   }
// }
