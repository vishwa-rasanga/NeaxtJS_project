import { NextResponse } from "next/server";
import clientPromise from "../../../libs/mongodb";
import { error } from "console";

// const MOVIES = [
//   { id: 1, title: "Lod of the Ring" },
//   { id: 2, title: "Harry portter" },
//   { id: 3, title: "Apacalipto" },
//   { id: 4, title: "Terminator" },
//   { id: 5, title: "Jrasic park" },
//   { id: 6, title: "Titanic" },
//   { id: 7, title: "The ghost" },
//   { id: 8, title: "Conjuaring" },
// ];

export const GET = async (req) => {
  try {
    //get movies from mongodb
    const client = await clientPromise();

    // smaple Mfliex movies  database name
    const db = client.db("sample_mflix");

    //fetch movies from data base
    const movies = await db
      .collection("movies")
      .find({})
      .sort({ metacritic: -1 })
      .limit(10)
      .toArray();

    return NextResponse.json(movies);
  } catch (error) {
    console.log("Mongodb error:", error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }

  // return NextResponse.json({ success: true, movies: MOVIES });
};
