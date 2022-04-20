import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../providers/userProvider";

const Navlinks: React.FC = () => {

  const { isLoggedIn } =
    useContext(userContext);

  const router = useRouter()
  const [name, setName] = useState("");

  useEffect(() => {
    changeLink()
  }, [router])

  function changeLink() {
    const link = window.location.href.split("/");
    if (link.length > 3) {
      setName(link[3])
    }
  }

  if (!isLoggedIn) {
    return <></>
  }

  return (
    <>
      <Link href="/projects">
        <a className={`opacity-80 hover:opacity-100 cursor-pointer duration-200 ${name == "projects" && "underline-a"}`}
          onMouseEnter={() => setName("project")}
          onMouseLeave={() => changeLink()}

        >
          Projects
        </a>
      </Link>
      <Link href="/peers">
        <a className={`opacity-80 hover:opacity-100 cursor-pointer duration-200 ${name == "peers" && "underline-a"}`}
          onMouseEnter={() => setName("peers")}
          onMouseLeave={() => changeLink()}
        >
          Peers
        </a>
      </Link>
    </>
  );
};

export default Navlinks;
