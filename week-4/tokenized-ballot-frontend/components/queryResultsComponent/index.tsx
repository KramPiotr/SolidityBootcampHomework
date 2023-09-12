import { useContractRead } from "wagmi";
import { ballotContract } from "@/app/assets/ballotContract";
import { fromHex } from "viem";

export default function QueryResults() {
    const { data, isError, isLoading } = useContractRead({
        ...ballotContract,
        functionName: "winnerName",
    });

    let winnerName = typeof data === "string" ? fromHex(data as `0x${string}`, 'string').replace(/\0/gu, "") : "";

    if (isLoading) return <div>Fetching query results…</div>;
    if (isError) return <div>Error fetching query results</div>;
    return <div>The winner is: {winnerName} </div>;
}