import { useContractRead } from "wagmi";
import { ballotContract } from "@/app/assets/ballotContract";

export default function VotingPower(params: { address: `0x${string}` }) {
    const { data, isError, isLoading } = useContractRead({
        ...ballotContract,
        functionName: "votingPower",
        args: [params.address],
    });

    const balance = typeof data === "bigint" ? Number(data) : 0;

    if (isLoading) return <div>Fetching voting power…</div>;
    if (isError) return <div>Error fetching voting power</div>;
    return <div>Voting power: {balance}</div>;
}