import { useAccount } from "wagmi";
import CastVotesComponent from "../castVotesComponent";
import styles from "./instructionsComponent.module.css";
import { useEffect, useState } from "react";
import RequestTokensToBeMinted from "../requestTokensComponent";
import TokenAddressFromAPI from "../tokenAddressComponent";
import TokenBalance from "../tokenBalanceComponent";
import DelegateTokens from "../delegateTokensComponent";
import VotingPower from "../votingPowerComponent";
import QueryResults from "../queryResultsComponent";

export default function InstructionsComponent() {
  return (
    <div className={styles.container}>
      <header className={styles.header_container}>
        <div className={styles.header}>
          <h1>Tokenized Ballot</h1>
        </div>
      </header>
      <div className={styles.get_started}>
        <PageBody></PageBody>
      </div>
    </div>
  );
}

function PageBody() {
  const { address, isConnecting, isDisconnected } = useAccount();

  if (!address) {
    return (<div> Wallet not connected </div>);
  }
  return (
    <div>
      <TokenAddressFromAPI />
      <TokenBalance address={address} />
      <RequestTokensToBeMinted address={address} />
      <DelegateTokens address={address} />
      <VotingPower address={address} />
      <CastVotesComponent options={["mango", "strawberry", "banana", "chocolate mint"]} account={address} />
      <QueryResults />
    </div>
  );
}

// function WalletInfo() {
//   const { address, isConnecting, isDisconnected } = useAccount();
//   const { chain } = useNetwork();
//   if (address)
//     return (
//       <div>
//         <p>Your account address is {address}</p>
//         <p>Connected to the network {chain?.name}</p>
//         <WalletAction></WalletAction>
//         <WalletBalance address={address}></WalletBalance>
//         <TokenName />
//         <TokenBalance address={address}></TokenBalance>
//         <RequestTokensToBeMinted address={address}></RequestTokensToBeMinted>
//       </div>
//     );
//   if (isConnecting)
//     return (
//       <div>
//         <p>Loading...</p>
//       </div>
//     );
//   if (isDisconnected)
//     return (
//       <div>
//         <p>Wallet disconnected. Connect wallet to continue</p>
//       </div>
//     );
//   return (
//     <div>
//       <p>Connect wallet to continue</p>
//     </div>
//   );
// }

// function WalletAction() {
//   const [signatureMessage, setSignatureMessage] = useState("");

//   const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage();
//   return (
//     <div>
//       <form>
//         <label>
//           Enter the message to be signed:
//           <input
//             type="text"
//             value={signatureMessage}
//             onChange={(e) => setSignatureMessage(e.target.value)}
//           />
//         </label>
//       </form>
//       <button
//         disabled={isLoading}
//         onClick={() =>
//           signMessage({
//             message: signatureMessage,
//           })
//         }
//       >
//         Sign message
//       </button>
//       {isSuccess && <div>Signature: {data}</div>}
//       {isError && <div>Error signing message</div>}
//     </div>
//   );
// }

// function WalletBalance(params: { address: `0x${string}` }) {
//   const { data, isError, isLoading } = useBalance({
//     address: params.address,
//   });

//   if (isLoading) return <div>Fetching balance…</div>;
//   if (isError) return <div>Error fetching balance</div>;
//   return (
//     <div>
//       Balance: {data?.formatted} {data?.symbol}
//     </div>
//   );
// }


// function TokenName() {
//   const { data, isError, isLoading } = useContractRead({
//     address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
//     abi: [
//       {
//         constant: true,
//         inputs: [],
//         name: "name",
//         outputs: [
//           {
//             name: "",
//             type: "string",
//           },
//         ],
//         payable: false,
//         stateMutability: "view",
//         type: "function",
//       },
//     ],
//     functionName: "name",
//   });

//   const name = typeof data === "string" ? data : 0;

//   if (isLoading) return <div>Fetching name…</div>;
//   if (isError) return <div>Error fetching name</div>;
//   return <div>Token name: {name}</div>;
// }