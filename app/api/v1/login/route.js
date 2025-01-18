import { NextResponse } from "next/server";
export const POST = async (req) => {
  const request = await req.json();

  console.log(request);

  return NextResponse.json({ sucess: true, username: "Vishwa" });
};

/*........More validation steps with states code-------*/
// import { NextResponse } from "next/server";

// export const POST = async (req) => {
//   try {
//     // Ensure the request has a body and parse it safely
//     let body;
//     try {
//       body = await req.json();
//     } catch (error) {
//       return NextResponse.json(
//         { success: false, message: "Invalid JSON in request body." },
//         { status: 400 } // Bad Request
//       );
//     }

//     const { email, password } = body;

//     console.log("Request Data:", { email, password });

//     // Validate input
//     if (!email || !password) {
//       return NextResponse.json(
//         { success: false, message: "Email and password are required." },
//         { status: 400 } // Bad Request
//       );
//     }

//     // e-mail and passowrd sucessfull
//     if (email === "vishwa@example.com" && password === "securepassword") {
//       return NextResponse.json(
//         { success: true, message: "Login successful", username: "Vishwa" },
//         { status: 200 } // OK
//       );
//     } else {
//       return NextResponse.json(
//         { success: false, message: "Invalid email or password." },
//         { status: 401 } // Unauthorized
//       );
//     }
//   } catch (error) {
//     console.error("Error in login route:", error);

//     // Return a 500 Internal Server Error for unexpected issues
//     return NextResponse.json(
//       { success: false, message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// };
