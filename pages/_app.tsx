import type { AppProps } from "next/app";
import { ThirdwebProvider, coinbaseWallet, embeddedWallet, metamaskWallet, smartWallet, walletConnect } from "@thirdweb-dev/react";
import "../styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "mumbai";

function MyApp({ Component, pageProps }: AppProps) {
  const smartWalletConfig = {
    factoryAddress: '0x25977D04c936D8855040738fCF4C874709Da997a',
    gasless: true,
  }
  const customWallet = smartWallet(embeddedWallet({recommended: true}), smartWalletConfig);

  customWallet.meta.name = 'CryptoDepto Wallet'
  customWallet.meta.iconURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANUSURBVHgB7ZlNTBNBFMffWxb8ggSMiZwEY+LBCyaAhhIT4gW1pQGFxKhnT9DSKhoTo0VFuChYEC9wIMGLF1AoQaOJB/thIoGTetDQkChGE8UPDLXtPKfYLW3DR5vUdibp/9J5b99u9rfTmdn5L0IKVX1n7BhDHEKAHZBmIaRA1T2PdpGCN/nlTkOGpEIKpOTlFvp9gQEAGoA0SlGwmHfFPd4sTEmPZEI1Npv6p6jcBYiVoVgBSeUrqujUIEKSskd0fQ4rMLoVnZMOpKp3vBYJJuPzUoHo7BN7ANgr3iyMPybNGDnY83QnIHsGYQhi7GP0cTlAbDZFxaURICgJhQTkD/qXGqNLpADRFVXeJoQqLeY3bf3smJiOrhEeRNfruApIZi0mBtecprq++DqhQXQ942eAyBZJEA24zXrbarXCghywT5YR0tBKhqZxKWjliyCtVi8kCF/wSnLAP4qI2v3NI6N658X6n2udIxxITfdIIV+1HyJgaTj1I0hQ52w1zq13nnAgPjV3kP+UhcMAEjv30myY2ug8VWcfm4WMSvnkMumXp9aKjuFGPgKORw4h3nCajAltDfh+BEsho2KRVmDxe35ewb+3D+bzvfG0nWhP8CLizloI5EumPmaHmBf0F4GkigF5bmlYAEkl7Q4xXlkQ0ZQFEU1ZENGUBRFN0oIU19YWR8dSglQPvijI2ZY/vJIhn5Qg7NfCFQKs1mJuFXVIB8LtoQuIcD6SIOh1t9RdlwqEG9hNRKxTi4ngsctsMIXa8ni/9tF9/On3c1Ni+Z6JaBaC6intuBQg5fwbpQrqeOQjK8EHYoHDbuuRr1qN8CBVD1xbNinKMHfldodiCv2hcqjJY2nwRtcJDWLjLjzMf+vgzUNajht1za7mOnd8bUq+6v4vPdle0cZNCEskQdTuajX2r1YrrouyafNe/tMVlRl1mQxr2kMi98hWrcHHx+sv8P7kWgZ2SOLPWoReCvr170ymdX0uoccIp/hNSu5Rj1nv3ahSaBBupp71tNS+TaQ2BkTX7dgPGZDLop+JzxHiJU+L4T4kqNgeyaFpSLvIC+HFThMS3eUzVFcSFxFvsPPXkKlFFrgMSUrlc9sMpFOhR8eiYlS8WpMxNgeYZ5yxGJL2oP8C5vYGXpGf5mwAAAAASUVORK5CYII='

  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
      supportedWallets={[
        customWallet,
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
      ]}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
