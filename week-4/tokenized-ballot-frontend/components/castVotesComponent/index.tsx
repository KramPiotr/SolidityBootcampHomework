
import { ballotContract } from "@/app/assets/ballotContract";
import { Key, useState } from "react";
import { parseUnits } from "viem";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

export default function CastVotesComponent(params: any) {

    const { options, account } = params;
    const [votedOption, setVotedOption] = useState(0);
    const [votedAmount, setVotedAmount] = useState("1");

    const { config, error: prepareError } = usePrepareContractWrite({
        ...ballotContract,
        functionName: 'vote',
        account,
        args: [votedOption, parseUnits(votedAmount as `${number}`, 9)]
    });
    const { data, isError, error, isLoading, isSuccess, write } = useContractWrite(config);

    return (
        <div>
            <select value={votedOption} onChange={(event) => {
                const newOptionIndex = parseInt(event.target.value, 10);
                setVotedOption(newOptionIndex);
            }}>
                {options.map((option: string, index: Key) => (
                    <option key={index} value={index}>
                        {option}
                    </option>
                ))}
            </select>
            <input value={votedAmount} onChange={(event) => setVotedAmount(event.target.value)} />
            <button disabled={!write || isLoading} onClick={async () => write?.()}>Vote</button>
            <div>
                {isLoading && "loading..."}
            </div>
            <div style={{ color: 'green' }}>
                {isSuccess && "Voting successful: " + data?.hash}
            </div>
            <div style={{ color: 'red' }}>
                {prepareError && "Contract prepare error: " + prepareError.name}
                {isError && error?.message}
            </div>
        </div>
    );
}

function vote(votedOption: number, votedAmount: string, write: any) {
    const gweiAmount = parseUnits(votedAmount as `${number}`, 18);
    write({
        args: [votedOption, gweiAmount]
    })
}