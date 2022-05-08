import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import SearchPage from "../index";
import Theme from "../../components/theme";
import { useEffect } from "react";
import { Button, CircularProgress, LinearProgress, Box, Typography } from "@mui/material";
import Link from "next/link";
import SearchBar from "../../components/searchbar";
import { Sort } from "@mui/icons-material";
import SortControl from "../../components/sortControl";

function Search() {
  const router = useRouter();
  const query = router.query;

  const [WalmartData, setWalmartData] = React.useState([]);
  const [SuperstoreData, setSuperstoreData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    fetch (`https://dev.ayo.icu/api/walmart/?search=${query.q}`).then(res => res.json()).then(info => {setWalmartData(info)});
    // fetch (`https://dev.ayo.icu/api/superstore/?search=${query.q}`).then(res => res.json()).then(info => {setSuperstoreData(info)});
  }, [query.q]);

  useEffect(() => {
    fetch (`https://dev.ayo.icu/api/superstore/?search=${query.q}`).then(res => res.json()).then(info => {setSuperstoreData(info)});
  }, [query.q]);
  


  function DataView() {
    switch (query.sort) {
      case "price":
        var tmp = []
        var tmp2 = []
        // console.log(WalmartData)
        // console.log(SuperstoreData)
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

        // for (const item of SuperstoreData.results) {
        //   // use regex to find price from string like "$1.00(est.)ez"
        //   var tmpPrice = item.price.match(/\d+\.\d+/g);
        //   if (tmpPrice) {
        //     item.price = parseFloat(tmpPrice[0]);
        //     tmp.push(item);
        //   }
        // }
        // sort tmp by price ascending
        tmp.sort(function(a, b) {
          return a.price - b.price;
        }
        );
        console.log(tmp)
        // console.log(tmp2)
        break;
      case "default":
        var tmp = WalmartData.results;
        break;
      default:
        var tmp = WalmartData.results;
        break;
    }



    return (
      <div>
        {tmp.map(item => (
          <Box key={item.name}>
              <a>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img src={item.img} alt={item.name} />
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2">{item.store}</Typography>
                    <Typography variant="body2">{item.price}</Typography>
                  </Box>
                </Box>
              </a>
          </Box>
        ))}
      </div>

      );
  }


  //     tmp.map(item => {
  //     if (item.price > 0) {
  //       // console.log(item.primary_offer.offer_price);
        
  //       return (
  //         <a href = {item.link} target="_blank" rel="noreferrer" >
  //           <div key={item.name} className="flex flex-col items-center justify-center p-4 m-4 rounded-lg border-2 border-green-400">
              
  //             <h3>{item.name}</h3> 
  //             <img src={item.img} alt="thumbnail" /> 
  //             <p>${item.price}</p>
  //             <p>{item.store}</p>
  //             {/* <p>{item.price_per_unit.amount}</p> */}
  //           </div>
  //         </a>

  //       );
  //     } else {
  //       return 
  //     }
  //   }
  //   )
  //   )
  // }

  function valueParser(value: string) {
    // this function is to compare the value of different things and rank them accordingly because walmart has different price/unit things
    // probably using regex to parse the value and compare it to the other values
    if (value.includes("/")) {
      return value.split("/")[0];
    } else {
      return value;
    }
  }

  function ProgressBar() {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="white">loading...</Typography>
      </Box>
    </Box>
    );
  }

  return (
    <>
      <Head>
        <title>hello tummy {query.q ? "| " + query.q : "sadge"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Theme><SearchBar /><SortControl />
        <div className="text-white">
          Your Search: <span className="text-green-400">{query.q}</span>
          <br />

          <span className="">{((WalmartData.status === "ok" || WalmartData.status === "error") && (SuperstoreData.status === "ok")) ? <DataView /> : <ProgressBar />}</span>
        </div>
      </Theme>
    </>
  );
}

export default function Checker() {
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