import axios from "axios";

export async function generateSignature(paramsToSign) {
  const url =
    process.env.NODE_ENV === "production"
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/sign`
      : "http://localhost:3000/api/sign";

  try {
    const response = await axios.post(url, {
      paramsToSign,
      api_key: process.env.CLOUDINARY_API_KEY,
    });

    if (!response.data.returnedData.signature) {
      throw new Error("Signature not found in response");
    }

    return response.data.returnedData.signature;
  } catch (error) {
    console.error("Error generating signature:", error);
    throw error;
  }
}
