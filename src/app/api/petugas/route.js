import Petugas from "@/models/Petugas";
import connectDB from "@/utils/mongoose";

export async function GET() {
  await connectDB();
  try {
    const petugas = await Petugas.find();
    console.log("Success get all petugas");
    return Response.json({
      message: "Success get all petugas",
      data: petugas,
      status: 200,
    });
  } catch (error) {
    console.error("Error get all petugas", error.message);
    return Response.json({ message: error.message }, { status: 400 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { nik, nama, password } = body;

    const existsPetugas = await Petugas.findOne({ nik });

    console.log("NIK sudah terdaftar", existsPetugas);

    if (existsPetugas) {
      return Response.json({
        message: "NIK sudah terdaftar",
        status: 400,
      });
    } else {
      const newPetugas = new Petugas({
        nama,
        nik,
        password,
      });

      const savePetugas = await newPetugas.save();

      console.log("Registrasi berhasil");

      return Response.json({
        message: "Registrasi berhasil",
        data: newPetugas,
      });
    }
  } catch (error) {
    console.log("Error: ", error.message);
    return Response.json({ error: error.message, status: 400 });
  }
}
