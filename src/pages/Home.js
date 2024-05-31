import React from "react";
import {Outlet} from "react-router-dom";
import Logo from "../components/Logos";
import Navigation from "../components/Navigation";
import {CryptoProvider} from "../context/CryptoProvider";
import {StorageProvider} from "../context/StorageProvider";
import {TrendingProvider} from "../context/TrendingProvider";


const Home = () => {
    return(
        <CryptoProvider>
            <TrendingProvider>
                <StorageProvider>

                </StorageProvider>
                <main
                className="w-full h-full flex flex-col first-letter:
                content-center items-center relative text-white font-nunito

                "
                >
                    <div className="w-screen h-screen bg-gray-300 fixed -z-20"/>
                    <Logo/>
                    <Navigation/>

                    <Outlet/>
                </main>
            </TrendingProvider>
        </CryptoProvider>
    );
};

export default Home;