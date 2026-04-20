import { Alert } from "react-native";

export const uploadImageToCloudinary = async (
  image: string,
  folderName: string,
) => {
  try {
    if (!image) throw new Error("No image provided for upload.");
    const data = new FormData();

    data.append("file", {
      uri: image,
      type: "image/jpeg",
      name: "upload.jpg",
    } as any);

    const upload_preset =  process.env.EXPO_PUBLIC_CLOUDINARY_PRESET as string
    data.append(
      "upload_preset",
      upload_preset,
    );
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      },
    );

    const json = await res.json();
    return {
      success: true,
      cloudinary_URI: json.secure_url,
    };
  } catch (err: any) {
    console.error("Upload failed:", err);
    Alert.alert("Error", err.message);
    return {
      success: false,
      cloudinary_URI: null,
    };
  }
};
