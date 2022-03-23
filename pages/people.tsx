import { useState } from "react";
import type { NextPage } from "next";
import PeopleCard from "../components/peopleCard";

const People: NextPage = () => {
  const [peopleData, setPeopledata] = useState(["a"]);
  return (
    <>
      <div className="bg-main-bg  text-white min-h-screen min-w-full">
        <h1 className="">People</h1>
        <div className="">
          {peopleData.map((people) => {
            return <PeopleCard />;
          })}
        </div>
      </div>
    </>
  );
};

export default People;
