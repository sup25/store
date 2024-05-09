import { Cloudinary } from "@cloudinary/url-gen";

export const cloudinary = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
  },
});
