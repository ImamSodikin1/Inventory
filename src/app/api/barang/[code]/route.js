import Barang from "../../../../models/Barang";
import connectDB from "../../../../utils/mongoose";
import BarangMasuk from "../../../../models/BarangMasuk";

export async function GET(request, { params }) {
  await connectDB();
  try {
    const barangFound = await Barang.findOne({ kodeBarang: params.code });

    if (!barangFound) {
      console.log("Barang Not Found");
      return Response.json({
        message: "Barang Not Found",
        status: 404,
      });
    }

    console.log("Succes Get barang by kode barang: ", barangFound);
    return Response.json({
      message: "Succes get barang by kode barang",
      status: 200,
      data: barangFound,
    });
  } catch (error) {
    console.log("Error get barang by kode barang: ", error.message);
    return Response.json({
      eroor: error.message,
      status: 400,
    });
  }
}

export async function PUT(request, { params }) {
  await connectDB();
  const body = await request.json();
  try {
    const barang = await Barang.findOne({ kodeBarang: params.code });

    if (!barang) {
      console.log("Barang Not Found");
      return Response.json({
        message: "Barang Not Found",
        status: 404,
      });
    }

    // jika ada update data barang
    barang.kodeBarang = body.kodeBarang;
    barang.namaBarang = body.namaBarang;
    barang.jenisBarang = body.jenisBarang;
    barang.stock = body.stock;
    barang.satuan = body.satuan;

    await barang.save();

    console.log("Success update data barang: ", barang);
    return Response.json({
      message: "Succes update data barang",
      status: 200,
      data: barang,
    });
  } catch (error) {
    console.log("Error update data barang: ", error.message);
    return Response.json({
      error: error.message,
      status: 400,
    });
  }
}

export async function DELETE(request, { params }) {
  await connectDB();
  try {
    const barang = await Barang.findOne({ kodeBarang: params.code });

    if (!barang) {
      console.log("Barang Not Found");
      return Response.json({
        message: "Barang Not Found",
        status: 404,
      });
    }

    await barang.deleteOne();

    console.log("Succes delete barang");
    return Response.json({
      success: true,
      status: 200,
      message: "Succes delete barang",
    });
  } catch (error) {
    console.log("Error delete barang: ", error.message);
    return Response.json({
      error: error.message,
      status: 400,
    });
  }
}

