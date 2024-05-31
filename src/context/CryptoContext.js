/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useLayoutEffect, useState} from "react";

// create context object
export const CryptoContext = createContext({});

//create the provider component
export const CryptoProvider = ({children}) => {
    const [cryptoData, setCryptoData] = useState();
    const [searchData, setSearchData] = useState();
    const [coinData, setCoinData] = useState();
    const [coinSearchData, setCoinSearchData] = useState();
    const [currency, setCurrency] = useState("usd");
    const [sortBy, setSortBy] = useState("market_cap_desc");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] =useState(250);
    const [perPage, setPerPage] = useState(10);
}


//This is how you can do error handling by creating one state to store the error,
//This is only for example purpose 
// create one state for the error

const [error, setError] = useState({data: "", coinData: "", search: ""});
// there can be 3 errors that we can catch from all three functions ,also send the error state
// through value prop

const getCryptoData = async () => {
    // here we will set an empty string for the data error
    setError({...error, data: ""});
    setCryptoData();
    setTotalPages(13220);

    ///try {
        // const data = await fetch(
    // `https://api.coingecko.com/api/v3/coins/list`
      //  )
    // .then((res) => res.json())
    // .then((json) => json);

    // console.log(data);
    //setTotalPages(data.length);
    // 
    //} catch (err) {

    // console.log(err);
    //}


    try {
        const data = await fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${page}&sparline=false&price_change_percentage=1h%2C24h%2C7d`

        ).then(async (res) => {
            if (res.ok) {
                res.json();
            }
            let errorResponse = await res.json();

            setError({...error, data: errorResponse.error});
            throw new Error(errorResponse.error);
        }).then((json) => json);


        // console.log(data);
        setCryptoData(data);
    } catch(err){
        console.log(err);
    }
};

const getCoindata = async (coinid) => {
    setCryptoData();
    try{
        const data = await fetch(
            `https://api.coingecko.com/api/v3/coins/${coinid}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`
        )

        .then((res) = res.json())
        .then((json) = res.json);


        //console.log("CoinData", data);
        setCoinData(data);
    }  catch (err){
        console.log(err);
    }
};

const getSearchResult = async (query) => {
    try{
        const data = await fetch (
            `https://api.coingecko.com/api/v3/search?query=${query}`
        )
        .then((res) = res.json())
        .then((json) = json);

        // console.log(data);
        setSearchResultData(data.coins);
    } catch(err){
        console.log(err);
    };

    useLayoutEffect(() => {
        getCryptoData();
    },[coinSearch,currency, sortBy,page, perPage]);


    return(
        <CryptoContext.Provider
        value={{
            cryptoData,
            searchData,
            getSearchResult,
            setCoinSearch,
            setCoinSearchData,
            currency,
            setCurrency,
            sortBy,
            setSortBy,
            page,
            setPage,
            totalPages,
            setTotalPages,
            resetFunction,
            setPerPage,
            perPage,
            getCoindata,
            coinData,
            error
        }}
        >
            {children}
        </CryptoContext.Provider>
    );
};