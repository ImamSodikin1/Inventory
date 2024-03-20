import Barang from "../../../models/Barang";
import connectDB from "../../../utils/mongoose";

export async function GET() {
  await connectDB();
  try {
    const barang = await Barang.find();

    if (!barang) {
      console.log("Barang Not Found");
      return Response.json({
        message: "Barang Not Found",
        data: [],
        status: 404,
      });
    }

    console.log("Success get all barang");
    return Response.json({
      message: "Succes",
      data: barang,
      status: 200,
    });
  } catch (error) {
    console.log("Error get all Barang");
    return Response.json({
      message: error.message,
      status: 400,
    });
  }
}

export async function POST(request) {
  await connectDB();
  try {
    const body = await request.json();
    const newBarang = new Barang(body);
    const saveBarang = await newBarang.save();
    console.log("Succe create new  Barang");
    return Response.json({
      message: "Succes create new Barang",
      data: saveBarang,
      status: 200,
    });
  } catch (error) {
    console.log("Error create new Barang: ", error.message);
    return Response.json({
      error: error.message,
      status: 400,
    });
  }
}
