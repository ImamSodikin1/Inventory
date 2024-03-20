import BarangKeluar from "../../../models/BarangKeluar";
import connectDB from "../../../utils/mongoose";
import Barang from "../../../models/Barang";

export async function GET() {
  await connectDB();
  try {
    const barangKeluar = await BarangKeluar.find();

    if (!barangKeluar) {
      console.log("Barang keluar Not Found");
      return Response.json({
        message: "Barang keluar Not Found",
      });
    }
    console.log("Berhasil get all barang keluar", barangKeluar);
    return Response.json({
      succes: "true",
      data: barangKeluar,
      status: 200,
    });
  } catch (error) {
    console.log("Error get all barang keluar", error.message);
    return Response.json({
      error: error.message,
      status: 400,
    });
  }
}

export async function POST(request) {
  await connectDB();
  try {
    const body = await request.json();

    const quantity = body.quantity;

    const code = body.code;

    const barang = await Barang.findOne({ kodeBarang: code });

    if (!barang) {
      console.log("Barang Not Found");
      return Response.json({
        error: "Barang Not Found",
        status: 404,
      });
    }

    if (barang.stock < quantity) {
      console.log("Stock barang tidak mencukupi");
      return Response.json({
        error: "Stock barang tidak mencukupi",
        status: 400,
      });
    }

    barang.stock = parseInt(barang.stock) - parseInt(quantity);
    // simpan perubahan stock ke database
    await barang.save();

    const newBarangKeluar = new BarangKeluar({
      kodeBarang: barang.kodeBarang,
      namaBarang: barang.namaBarang,
      jenisBarang: barang.jenisBarang,
      satuan: barang.satuan,
      code: code,
      quantity: parseInt(quantity),
      penerima: body.penerima,
    });

    const saveBarangKeluar = await newBarangKeluar.save();
    console.log("Succes create new Barang Keluar", saveBarangKeluar);
    return Response.json({
      message: "Succes create new Barang keluar",
      status: 200,
      data: saveBarangKeluar,
    });
  } catch (error) {
    console.log("Error create new Barang Keluar: ", error.message);
    return Response.json({
      error: error.message,
      status: 400,
    });
  }
}
