import { tokenContract } from "@/app/assets/tokenContract";
import { useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

export default function DelegateTokens(params: { address: `0x${string}` }) {
    const [delegatee, setDelegatee] = useState<string>(params.address);

    const { config, error: prepareError } = usePrepareContractWrite({
        ...tokenContract,
        functionName: 'delegate',
        args: [delegatee as `0x${string}`]
    });
    const { data, isError, error, isLoading, isSuccess, write } = useContractWrite(config);

    return (
        <div>
            <input value={delegatee} onChange={(event) => {
                return setDelegatee(event.target.value);
            }}/>
            <button disabled={!write || isLoading} onClick={async () => write?.()} >
                Delegate tokens
            </button>
            <div>
                {isLoading && "loading..."}
            </div>
            <div style={{color: 'green'}}>
                {isSuccess && "Delegation successful: " + data?.hash}
            </div>
            <div style={{color: 'red'}}>
                {prepareError && "Contract prepare error: " + prepareError.name}
                {isError && error?.message}
            </div>

        </div>
    )
}