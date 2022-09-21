import "../styles/globals.css"
import React from "react"
import { MoralisProvider } from "react-moralis"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Head from "next/head"
import { NotificationProvider } from "web3uikit"

const APP_ID = process.env.NEXT_PUBLIC_MORALIS_APPID
const SERVER_URL = process.env.NEXT_PUBLIC_MORALIS_SERVERURL

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Head>
                <title>NFT Marketplace</title>
                <meta name="description" content="NFT Marketplace" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
                <NotificationProvider>
                    <Header />
                    <Component {...pageProps} />
                </NotificationProvider>
            </MoralisProvider>
        </div>
    )
}

export default MyApp
