import axios from "axios";

export async function generateSignature(paramsToSign) {
  try {
    const response = await axios.post("http://localhost:3000/api/sign", {
      paramsToSign,
      api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    });

    if (!response.data.returnedData.signature) {
      throw new Error("Signature not found in response");
    }

    return response;
  } catch (error) {
    console.error("Error generating signature:", error);
    throw error;
  }
}
