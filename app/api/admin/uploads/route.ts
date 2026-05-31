import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { filename, dataUrl } = body;

    if (!dataUrl) {
      return NextResponse.json({ error: "Missing file data" }, { status: 400 });
    }

    const isVideo = (typeof dataUrl === "string" && dataUrl.startsWith("data:video")) || (/\.(mp4|mov|webm|mkv)$/i).test(filename || "");

    const res = await cloudinary.uploader.upload(dataUrl, {
      folder: "projects",
      public_id: `${Date.now()}-${(filename || "file").replace(/[^a-zA-Z0-9_-]/g, "_")}`,
      resource_type: isVideo ? "video" : "image",
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET || undefined,
    });

    return NextResponse.json({ url: res.secure_url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
