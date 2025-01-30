import ky from "ky";

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL, // Correctly references the .env variable
  timeout: 60000,
  retry: 0,
});

//console.log("Prefix URL:", process.env.NEXT_PUBLIC_API_URL);
