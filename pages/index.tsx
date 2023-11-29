import { ConnectWallet, useAddress, useContract, useOwnedNFTs, useTokenBalance } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { NFT_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS } from "../constans/addresses";

const Home: NextPage = () => {
  const address = useAddress();

  const {
    contract: nftContract
  } = useContract(NFT_CONTRACT_ADDRESS)

  // const {
  //   contract: tokenContract
  // } = useContract(TOKEN_CONTRACT_ADDRESS)

  const {
    data: ownedNFTs,
    isLoading: isNFTLoading,
  } = useOwnedNFTs(nftContract, address)
  // const {
  //   data: tokenBalance,
  //   isLoading: isTokenLoading,
  // } = useTokenBalance(tokenContract, address)

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <ConnectWallet />
        {address && (
          <>
            {!isNFTLoading ? (
              ownedNFTs && ownedNFTs.length > 0 ? (
                <p>Total NFTs Owned: {ownedNFTs.length} </p>
              ) : (
                <p>Total Owned NFTs: 0 </p>
              )
            ) : (
              <p>Loading...</p>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Home;
