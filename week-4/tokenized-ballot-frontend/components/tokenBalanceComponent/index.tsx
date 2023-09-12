import { useContractRead } from "wagmi";
import { tokenContract } from "@/app/assets/tokenContract";

export default function TokenBalance(params: { address: `0x${string}` }) {
    const { data, isError, isLoading } = useContractRead({
        ...tokenContract,
        functionName: "balanceOf",
        args: [params.address],
    });

    const balance = typeof data === "bigint" ? Number(data) : 0;

    if (isLoading) return <div>Fetching balance…</div>;
    if (isError) return <div>Error fetching balance</div>;
    return <div>Balance: {balance}</div>;
}