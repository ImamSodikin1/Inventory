import BarangKeluar from "../../../../models/BarangKeluar";
import connectDB from "../../../../utils/mongoose";
import Barang from "../../../../models/Barang";

export async function GET(request, { params }) {
  await connectDB();
  try {
    const barangOut = await BarangKeluar.findOne({ kodeBarang: params.code });
    if (!barangOut) {
      console.log("Barang keluar Not Found");
      return Response.json({
        message: "Barang keluar Not Found",
        status: 404,
      });
    }

    console.log("Succes get barang keluar by kode: ", barangOut);
    return Response.json({
      success: true,
      status: 200,
      data: barangOut,
    });
  } catch (error) {
    console.log("Error get barang keluar : ", error.message);
    return Response.json({
      error: error.message,
      status: 400,
    });
  }
}

export async function PUT(request, { params }) {
  await connectDB();
  const body = await request.json();
  try {
    const barangOut = await BarangKeluar.findOne({ kodeBarang: params.code });

    if (!barangOut) {
      console.log("Barang keluar Not Found");
      return Response.json({
        message: "Barang keluar Not Found",
        status: 404,
      });
    }

    const barang = await Barang.findOne({ kodeBarang: params.code });

    if (!barang) {
      console.log("Barang Not Found");
      return Response.json({
        message: "Barang Not Found",
        status: 200,
      });
    }

    // update stock
    barang.stock = parseInt(barang.stock) - parseInt(body.quantity);
    await barang.save();

    // jika data barang keluar ada maka update
    barangOut.KodeBarang = barang.kodeBarang;
    barangOut.namaBarang = barang.namaBarang;
    barangOut.jenisBarang = barang.jenisBarang;
    barangOut.satuan = barang.satuan;
    barangOut.quantity = parseInt(body.quantity);
    barangOut.penerima = body.penerima;

    await barangOut.save();

    console.log("Succes update barang keluar");
    return Response.json({
      success: true,
      message: "Success update barang keluar",
      status: 200,
    });
  } catch (error) {
    console.log("Error update barang keluar: ", error.message);
    return Response.json({
      message: "Error update barang keluar",
      status: 400,
    });
  }
}

export async function DELETE(request, { params }) {
  await connectDB();
  try {
    const barangOut = await BarangKeluar.findOne({ kodeBarang: params.code });

    if (!barangOut) {
      console.log("Barang keluar Not Found");
      return Response.json({
        message: "Barang keluar Not Found",
        status: 404,
      });
    }

    await barangOut.deleteOne();

    console.log("Succes delete barang keluar");
    return Response.json({
      success: true,
      message: "Success delete barang keluar",
      status: 200,
    });
  } catch (error) {
    console.log("Error delete barang keluar: ", error.message);
    return Response.json({
      error: error.message,
      status: 400,
    });
  }
}
