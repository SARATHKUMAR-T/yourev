import React from "react";

export default function AboutCard({ about }: { about: any }) {
  return (
    <div className="h-full p-2 w-full bg-green-0 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10   grid grid-cols-[6rem,auto] py-6 px-4 text-slate-200 bg-slate-100 ">
      <div className="place-self-start w-full px-4">
        <div className="h-14 w-full flex items-center justify-center rounded-lg bg-yellow-500 text-slate-800">
          <p className="text-xl font-bold">{`0${about.id}`}</p>
        </div>
      </div>
      <div className="w-full">
        <h1 className="mb-3 text-4xl text-yellow-500">{about.title}</h1>
        <p className="font-medium">{about.des}</p>
      </div>
    </div>
  );
}
