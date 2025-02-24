import React from "react";
import { getMovies } from "../libs/apis/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// 1.Add shadcn card
// 2.Create movies GET enpoint
// 3.read the dummy respons
// 4.render data set in UI
export default async function Dashboard() {
  const moviesQuery = await getMovies();

  console.log("MOVIE FE:", moviesQuery);

  return (
    <main>
      {/* navigation bar*/}
      <nav className="bg-blue-300 w-full h-16 flex px-4 justify-start items-center">
        <div className="container">
          <h1 className="text-black font-bold text-xl">Mflix Dashboard </h1>
        </div>
      </nav>

      {/* body */}

      <div className="container m-8 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/*<div className="h-96 bg-green-400"> dev1</div>
          <div className="h-96 bg-red-400"> dev2</div>
          <div className="h-96 bg-yellow-400"> dev3</div>
          <div className="h-96 bg-pink-400"> dev4</div>
          <div className="h-96 bg-blue-400"> dev5</div>
          <div className="h-96 bg-orange-400"> dev5</div>
          <div className="h-96 bg-pink-400"> dev5</div>
          <div className="h-96 bg-orange-400"> dev5</div>*/}
          {moviesQuery?.length &&
            moviesQuery.map((movies) => (
              <div key={movies._id} className="h-[480px]">
                {/* {movies?.id}
                {movies?.title} */}
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{movies?.title}</CardTitle>
                    <CardDescription className="src-only"></CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center bg-black w-full h-[220px] mb-4 rounded">
                      <img
                        src={movies?.poster}
                        alt={movies?.title}
                        width={200}
                        height={400}
                        className="h-full w-auto object-contain"
                      />
                    </div>
                    <p className="line-clamp-3">{movies?.plot}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between"></CardFooter>
                </Card>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
