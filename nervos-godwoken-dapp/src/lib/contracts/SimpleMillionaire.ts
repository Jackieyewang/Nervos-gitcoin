import Web3 from 'web3';
import * as MillionaireJSON from '../../../build/contracts/Millionaire.json';
import { Millionaire } from '../../types/Millionaire';

const DEFAULT_SEND_OPTIONS = {
    gas: 6000000
};

export class SimpleMillionaire {
    web3: Web3;

    contract: Millionaire;

    address: string;

    constructor(web3: Web3) {
        this.web3 = web3;
        this.contract = new web3.eth.Contract(MillionaireJSON.abi as any) as any;
    }

    get isDeployed() {
        return Boolean(this.address);
    }

    async getStoredValue(fromAddress: string) {
        const data = await this.contract.methods.get().call({ from: fromAddress });

        return data;
    }

    async setaValue(value: number, fromAddress: string) {
        const tx = await this.contract.methods.seta(value).send({
            ...DEFAULT_SEND_OPTIONS,
            from: fromAddress,
            value
        });

        return tx;
    }
    async setbValue(value: number, fromAddress: string) {
        const tx = await this.contract.methods.setb(value).send({
            ...DEFAULT_SEND_OPTIONS,
            from: fromAddress,
            value
        });

        return tx;
    }


    async deploy(fromAddress: string) {
        const deployTx = await (this.contract
            .deploy({
                data: MillionaireJSON.bytecode,
                arguments: []
            })
            .send({
                ...DEFAULT_SEND_OPTIONS,
                from: fromAddress,
                to: '0x0000000000000000000000000000000000000000'
            } as any) as any);

        this.useDeployed(deployTx.contractAddress);

        return deployTx.transactionHash;
    }

    useDeployed(contractAddress: string) {
        this.address = contractAddress;
        this.contract.options.address = contractAddress;
    }
}
