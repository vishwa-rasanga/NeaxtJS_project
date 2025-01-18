import ky from "ky";

import { api } from "../api";
export const loginUser = async (loginData) => {
  try {
    console.log("Login Data:", loginData);

    const response = await fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Ensure server recognizes JSON payload
      },
      body: JSON.stringify({
        email: loginData?.email,
        password: loginData?.password,
      }),
    });

    // Check if the response is OK (status in the range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();
    console.log("LOGIN ACTION:", data);

    return data; // Return the parsed data if needed
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error; // Re-throw or handle the error as needed
  }
};

/*----------Movies------------------*/
export const getMovies = async () => {
  try {
    const response = await api.get("movies", {
      cache: "no-store",
    });

    if (response.ok) {
      const data = await response.json(); // Await the promise here
      console.log("Server MOVIES:", data); // Logs the resolved array
      return data; // Return the resolved data
    } else {
      console.error("Server error:", response.status, response.statusText);
      return { error: true, message: "Something went wrong" };
    }
  } catch (error) {
    if (error.response) {
      // Handle HTTP errors
      console.error(
        "HTTP error:",
        error.response.status,
        await error.response.text()
      );
    } else {
      // Handle non-HTTP errors (e.g., network issues)
      console.error("Unknown error:", error.message);
    }
    return { error: true, message: "An unknown error occurred" };
  }
};
