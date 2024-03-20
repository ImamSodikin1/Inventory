import Barang from "@/models/Barang";
import BarangMasuk from "../../../../models/BarangMasuk";
import connectDB from "../../../../utils/mongoose";

export async function GET(request, { params }) {
  await connectDB();
  try {
    const barangIn = await BarangMasuk.findOne({ kodeBarang: params.code });
    if (!barangIn) {
      console.log("Barang masuk Not Found");
      return Response.json({
        message: "Barang masuk Not Found",
        status: 404,
      });
    }
    console.log("Succes get barang masuk by kode barng", barangIn);
    return Response.json({
      message: "Succes get barang masuk get by kode barang",
      status: 200,
      data: barangIn,
    });
  } catch (error) {
    console.log("Error get barang masuk : ", error.message);
    return Response.json({
      error: error.message,
      status: 400,
    });
  }
}

export async function PUT(request, { params }) {
  await connectDB();
  const body = await request.json();
  console.log(params.code);
  try {
    let barangIn = await BarangMasuk.findOne({ kodeBarang: params.code });
    if (!barangIn) {
      console.log("Barang masuk Not Found");
      return Response.json({
        message: "Barang masuk Not Found",
        status: 404,
      });
    }

    // update stock barang
    const barang = await Barang.findOne({ kodeBarang: params.code });

    if (!barang) {
      console.log("Barang Not Found");
      return Response.json({
        message: "Barang Not Found",
        status: 404,
      });
    }

    // Mengupdate stock barang
    barang.stock = parseInt(barang.stock) + parseInt(body.quantity);
    await barang.save();

    // update data barang masuk
    barangIn.kodeBarang = barang.kodeBarang;
    barangIn.namaBarang = barang.namaBarang;
    barangIn.jenisBarang = barang.jenisBarang;
    barangIn.satuan = barang.satuan;
    barangIn.quantity = parseInt(body.quantity);
    barangIn.pemasok = body.pemasok;

    await barangIn.save();

    console.log("Succes update barang masuk: ", barangIn);
    return Response.json({
      success: true,
      status: 200,
      data: barangIn,
    });
  } catch (error) {
    console.log("Error update barang masuk: ", error.message);
    return Response.json({
      error: error.message,
      status: 400,
    });
  }
}

export async function DELETE(request, { params }) {
  await connectDB();
  try {
    const barangMasuk = await BarangMasuk.findOne({ kodeBarang: params.code });
    if (!barangMasuk) {
      console.log("Barang Masuk Not Found");
      return Response.json({
        message: "Barang masuk Not Found",
        status: 404,
      });
    }
    await BarangMasuk.deleteOne();
    console.log("Succes delete barang masuk");
    return Response.json({
      success: true,
      status: 200,
    });
  } catch (error) {
    console.log("Error delete barang masuk", error.message);
    return Response.json({
      error: error.message,
      status: 400,
    });
  }
}
