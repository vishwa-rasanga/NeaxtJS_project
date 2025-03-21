import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt"; // For ES Module

export const POST = async (req) => {
  // console.log(name, email, password);

  try {
    const { name, email, password } = await req.json();
    // Back-end validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "name, email and password are required." },
        { status: 400 }
      );
    }
    //we can add further validation here
    const client = await clientPromise();
    const db = client.db("sample_mflix");
    const existingUser = await db.collection("users").findOne({ email });
    // console.log("Is existing User", existingUser);
    if (existingUser) {
      return NextResponse.json(
        {
          error: "user with this email already existis",
        },
        { status: 409 }
      );
    }

    //if database esxiting passowrd
    const hashedPassword = await bcrypt.hash(password, 10);

    //console.log("hash Password:", hashedPassword);

    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    if (result && result.acknowledged) {
      //console.log("MongoDb", result);
      return NextResponse.json({
        success: true,
        //Create a user object
        user: { name, email, userId: result.insertedId },
      });
    } else {
      console.log("Mongo DB Error:", error);
      return NextResponse.json(
        { error: "user registration fail" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log("Mongo DB Error:", error);
    return NextResponse.json(
      { error: "internel server error" },
      { status: 500 }
    );
  }
};
