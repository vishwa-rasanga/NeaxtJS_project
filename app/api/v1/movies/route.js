import { NextResponse } from "next/server";

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
  return NextResponse.json({ success: true, movies: [] });
};
