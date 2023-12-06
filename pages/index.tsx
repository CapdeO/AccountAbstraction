import { ConnectWallet, useAddress, useContract, useOwnedNFTs, useTokenBalance } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { NFT_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS } from "../constans/addresses";
import GooglePayButton from "@google-pay/button-react";

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
                <div>
                  <p>Total Owned NFTs: 0 </p>
                  <GooglePayButton 
                    environment="TEST"
                    paymentRequest={{
                      apiVersion: 2,
                      apiVersionMinor: 0,
                      allowedPaymentMethods: [
                        {
                          type: 'CARD',
                          parameters: {
                            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                            allowedCardNetworks: ['MASTERCARD', 'VISA'],
                          },
                          tokenizationSpecification: {
                            type: 'PAYMENT_GATEWAY',
                            parameters: {
                              gateway: 'example',
                              gatewayMerchantId: 'exampleGatewayMerchantId',
                            }
                          },
                        }
                      ],
                      merchantInfo: {
                        merchantId: '1234567890123456789',
                        merchantName: 'Demo Merchant'
                      },
                      transactionInfo: {
                        totalPriceStatus: 'FINAL',
                        totalPriceLabel: 'Total',
                        totalPrice: '1',
                        currencyCode: 'USD',
                        countryCode: 'US'
                      },
                      callbackIntents: ['PAYMENT_AUTHORIZATION'],
                    }}
                    onLoadPaymentData={paymentRequest => {
                      console.log('Success', paymentRequest)
                    }}
                    onPaymentAuthorized={paymentData => {
                      console.log('Payment Authorized Success', paymentData)
                      return { transactionState: 'SUCCESS' }
                    }}
                    //existingPaymentMethodRequired='false'
                    buttonColor='black'
                    buttonType="buy"
                  />
                </div>
                

                
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
