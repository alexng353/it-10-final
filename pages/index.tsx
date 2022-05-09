import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import SearchPage from "../components/homepage";
import Theme from "../components/theme";
import { useEffect } from "react";
import { Button, CircularProgress, LinearProgress, Box, Typography } from "@mui/material";
import Link from "next/link";
import SearchBar from "../components/searchbar";
import { Sort } from "@mui/icons-material";
import SortControl from "../components/sortControl";

function Search() {
  const router = useRouter();
  const query = router.query;

  const [WalmartData, setWalmartData] = React.useState([]);
  const [SuperstoreData, setSuperstoreData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    fetch (`https://dev.ayo.icu/api/walmart/?search=${query.search}`).then(res => res.json()).then(info => {setWalmartData(info)});
    // fetch (`https://dev.ayo.icu/api/superstore/?search=${query.search}`).then(res => res.json()).then(info => {setSuperstoreData(info)});
  }, [query.search]);

  useEffect(() => {
    setLoading(true)
    fetch (`https://dev.ayo.icu/api/superstore/?search=${query.search}`).then(res => res.json()).then(info => {setSuperstoreData(info); setLoading(false)});
  }, [query.search]);


  function DataView() {
    var tmp =[]
    for (const item of WalmartData.results) {
      if (item.primary_offer.offer_price > 0) {
        //log out name, price, and link
        tmp.push({img: item.thumbnail, name: item.title, price: item.primary_offer.offer_price, link: item.product_page_url, store:"Walmart"});
      }
    }
    for (const item of SuperstoreData.results) {
      var tmpPrice = parseFloat(item.price.match(/\d+\.\d+/g));
      if (tmpPrice > 0) {
        tmp.push({img: item.img, name: item.name, price: tmpPrice, link: item.link, store:"Superstore"});
      }
    }
    switch (query.sort) {
      case "price":
        tmp.sort(function(a, b) {
          return a.price - b.price;
        }
        );
        break;
      case "name":
        tmp.sort(function(a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        }
        );
        break;
      case "default":
        break;
      default:
        break;
    }



    return (
      <div className="">
        {tmp.map(item => (
          <Box key={item.name}>
            <a href={item.link}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <span className="w-32">
                  <img src={item.img} alt={item.name}  className="w-32"/>
                </span>
                
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2">{item.store}</Typography>
                    <Typography variant="body2" sx={{color: "#4ADE80"}}>${item.price}</Typography>
                  </Box>
              </Box>
            </a>
            <hr className="text-green mt-4 mb-4"/>
          </Box> 
        ))}
      </div>
    )
        }
            

  function valueParser(value: string) {
    // this function is to compare the value of different things and rank them accordingly because walmart has different price/unit things
    // probably using regex to parse the value and compare it to the other values
    if (value.includes("/")) {
      return value.split("/")[0];
    } else {
      return value;
    }
  } // literally fucking useless for the time being

  function ProgressBar() {
    return (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="white">loading...</Typography>
          </Box>

        </Box>
        <Typography variant="h4" color="white">Parsing data takes between 5 and 15 seconds</Typography>
        <Typography variant="h5" color="white">Please be patient...</Typography>
      </>

      );
    }

  return (
    <>
      <Head>
        <title>hello tummy {query.search ? "| " + query.search : "sadge"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Theme><SearchBar /><SortControl />
        <div className="text-white">
          Your Search: <span className="text-green-400">{query.search}</span>
          <br />
          <br />

          <span className="">{((WalmartData.status === "ok" || WalmartData.status === "error") && (SuperstoreData.status === "ok") && loading === false) ? <DataView /> : <ProgressBar />}</span>
        </div>
      </Theme>
    </>
  );
}

export default function Checker() {
  const router = useRouter();
  const query = router.query;
  if (query.search) {
    return <Search />;
  } else {
    return (
      <>
        <SearchPage />
      </>
    );
  }
}