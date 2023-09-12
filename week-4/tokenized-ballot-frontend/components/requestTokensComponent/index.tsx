import { useState } from "react";

export default function RequestTokensToBeMinted(params: { address: `0x${string}` }) {
    const [data, setData] = useState<any>(null);
    const [amount, setAmount] = useState(1);
    const [isLoading, setLoading] = useState(false);

    if (isLoading) return <p>Requesting tokens from API...</p>;

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: params.address, amount })
    };

    return (
        <div>
            <input value={amount} onChange={(event) => setAmount(Number(event.target.value))} />
            <button disabled={isLoading} onClick={() => {
                setLoading(true);
                fetch("http://localhost:3001/mint-tokens", requestOptions)
                    .then((res) => res.json())
                    .then((data) => {
                        setData(data);
                        setLoading(false);
                    });
            }} >
                Request tokens
            </button>
            <div style={{ color: 'green' }}>
                {
                    data?.success && "Mint worked: " + data.txHash
                }
            </div>
            <div style={{ color: 'red' }}>
                {
                    data && !data.success && "Mint failed"
                }
            </div>
        </div>
    )
}