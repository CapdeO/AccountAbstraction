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

  customWallet.meta.name = 'Google'
  customWallet.meta.iconURL = 'https://e7.pngegg.com/pngimages/344/344/png-clipart-google-logo-google-logo-g-suite-google-text-logo-thumbnail.png'

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
