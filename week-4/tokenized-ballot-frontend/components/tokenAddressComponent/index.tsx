import { useEffect, useState } from "react";

export default function TokenAddressFromAPI() {
    const [data, setData] = useState<any>(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3001/get-address/")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            });
    }, []);

    if (isLoading) return <p>Loading token address from API...</p>;
    if (!data) return <p>No answer from API</p>;

    return (
        <div>
            Token address from API: {data.address}
        </div>
    );
}