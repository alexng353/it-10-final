import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import SearchPage from "../index";
import Theme from "../../components/theme";

function Search() {
  const router = useRouter();
  const query = router.query;

  return (
    <>
      <Head>
        <title>hello tummy {query.q ? "| " + query.q : "sadge"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Theme>
        <div className="text-white">
          Your Search: <span className="text-green-400">{query.q}</span>
        </div>
      </Theme>
    </>
  );
}

export default function checker() {
  const router = useRouter();
  const query = router.query;
  if (query.q) {
    return <Search />;
  } else {
    return (
      <>
        <SearchPage />
      </>
    );
  }
}
