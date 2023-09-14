import { lotteryContract } from "@/app/assets/lotteryContract";
import { useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { Input, Button, Flex } from '@chakra-ui/react';

export default function NumberModificationComponent(params: { functionName: string, buttonName: string}) {
    const [state, setState] = useState<number>(0);

    const { config, error: prepareError } = usePrepareContractWrite({
        ...lotteryContract,
        functionName: params.functionName,
        args: [state]
    });
    const { data, isError, error, isLoading, isSuccess, write } = useContractWrite(config);

    return (
        <Flex>
            <Input value={state} onChange={(event) => {
                return setState(Number(event.target.value));
            }} />
            <Button disabled={!write || isLoading} onClick={async () => write?.()} >
                {params.buttonName}
            </Button>
            <div>
                {isLoading && "loading..."}
            </div>
            <div style={{ color: 'green' }}>
                {isSuccess && params.buttonName + " was successful: " + data?.hash}
            </div>
            <div style={{ color: 'red' }}>
                {prepareError && "Contract prepare error: " + prepareError.name}
                {isError && error?.message}
            </div>

        </Flex>
    )
}