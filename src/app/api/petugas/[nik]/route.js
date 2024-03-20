import Petugas from "@/models/Petugas";
import connectDB from "@/utils/mongoose";

export async function GET({ context }) {
  const { nik } = context.params.nik;

  await connectDB();

  try {
    if (!nik) {
      console.log("NIK Missing");
      return Response.json({
        message: "NIK Missing",
      });
    }

    const petugas = await Petugas.findByNik(nik);

    if (!petugas) {
      console.log("Petugas Not Found");
      return Response.json({
        message: "Petugas Not Found",
        status: 404,
      });
    }

    console.log("Success Get petugas by NIK");
    return Response.json({
      data: petugas,
    });
  } catch (error) {
    console.log("Error get petugas by NIK", error.message);
    return Response.json({
      error: error.message,
    });
  }
}

export async function PUT(request, { params }) {
  const body = await request.json();
  await connectDB();
  try {
    const updatePetugas = await Petugas.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    if (!updatePetugas) {
      console.log("Petugas Not Found");
      return Response.json({
        message: "Petugas Not Found",
        status: 404,
      });
    }
    console.log("Succes update petugas");
    return Response.json({
      message: "Succes update petugas",
      data: updatePetugas,
      status: 200,
    });
  } catch (error) {
    console.log("Failde update petugas");
    return Response.json({
      message: "Failde update petugas",
      error: error.message,
      status: 400,
    });
  }
}

export async function DELETE(request, { params }) {
  await connectDB();
  try {
    const deletePetugas = await Petugas.findByIdAndDelete(params.id);

    if (!deletePetugas) {
      console.log("Petugas Not Found");
      return Response.json({
        message: "Petugas Not Found",
        status: 404,
      });
    }
    console.log("Succes Delete Petugas");
    return Response.json({
      message: "Succes Delete Petugas",
      status: 200,
    });
  } catch (error) {
    console.log("Error delete petugas", error.message);
    return Response.json({
      error: error.message,
    });
  }
}
