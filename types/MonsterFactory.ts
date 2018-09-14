
import { BigNumber } from 'bignumber.js';
import { W3, SoltsiceContract } from 'soltsice';

/**
 * MonsterFactory API
 */
export class MonsterFactory extends SoltsiceContract {
    public static get artifacts() { return require('../build/contracts/MonsterFactory.json'); }

    public static get bytecodeHash() {
        // we need this before ctor, but artifacts are static and we cannot pass it to the base class, so need to generate
        let artifacts = MonsterFactory.artifacts;
        if (!artifacts || !artifacts.bytecode) {
            return undefined;
        }
        let hash = W3.sha3(JSON.stringify(artifacts.bytecode));
        return hash;
    }

    // tslint:disable-next-line:max-line-length
    public static async new(deploymentParams: W3.TX.TxParams, ctorParams?: {}, w3?: W3, link?: SoltsiceContract[], privateKey?: string): Promise<MonsterFactory> {
        w3 = w3 || W3.default;
        if (!privateKey) {
            let contract = new MonsterFactory(deploymentParams, ctorParams, w3, link);
            await contract._instancePromise;
            return contract;
        } else {
            let data = MonsterFactory.newData(ctorParams, w3);
            let txHash = await w3.sendSignedTransaction(W3.zeroAddress, privateKey, data, deploymentParams);
            let txReceipt = await w3.waitTransactionReceipt(txHash);
            let rawAddress = txReceipt.contractAddress;
            let contract = await MonsterFactory.at(rawAddress, w3);
            return contract;
        }
    }

    public static async at(address: string | object, w3?: W3): Promise<MonsterFactory> {
        let contract = new MonsterFactory(address, undefined, w3, undefined);
        await contract._instancePromise;
        return contract;
    }

    public static async deployed(w3?: W3): Promise<MonsterFactory> {
        let contract = new MonsterFactory('', undefined, w3, undefined);
        await contract._instancePromise;
        return contract;
    }

    // tslint:disable-next-line:max-line-length
    public static newData(ctorParams?: {}, w3?: W3): string {
        // tslint:disable-next-line:max-line-length
        let data = SoltsiceContract.newDataImpl(w3, MonsterFactory.artifacts, ctorParams ? [] : []);
        return data;
    }

    protected constructor(
        deploymentParams: string | W3.TX.TxParams | object,
        ctorParams?: {},
        w3?: W3,
        link?: SoltsiceContract[]
    ) {
        // tslint:disable-next-line:max-line-length
        super(
            w3,
            MonsterFactory.artifacts,
            ctorParams ? [] : [],
            deploymentParams,
            link
        );
    }
    /*
        Contract methods
    */
    
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:variable-name
    public ownerToMonster(_0: string, txParams?: W3.TX.TxParams): Promise<BigNumber> {
        return new Promise((resolve, reject) => {
            this._instance.ownerToMonster
                .call(_0, txParams || this._sendParams)
                .then((res: any) => resolve(res))
                .catch((err: any) => reject(err));
        });
    }
    
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:variable-name
    public monsters(_0: BigNumber | number, txParams?: W3.TX.TxParams): Promise<any> {
        return new Promise((resolve, reject) => {
            this._instance.monsters
                .call(_0, txParams || this._sendParams)
                .then((res: any) => resolve(res))
                .catch((err: any) => reject(err));
        });
    }
    
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:variable-name
    public monsterToOwner(_0: BigNumber | number, txParams?: W3.TX.TxParams): Promise<string> {
        return new Promise((resolve, reject) => {
            this._instance.monsterToOwner
                .call(_0, txParams || this._sendParams)
                .then((res: any) => resolve(res))
                .catch((err: any) => reject(err));
        });
    }
    
    // tslint:disable-next-line:member-ordering
    public createMonster = Object.assign(
        // tslint:disable-next-line:max-line-length
        // tslint:disable-next-line:variable-name
        (_name: string, txParams?: W3.TX.TxParams, privateKey?: string): Promise<W3.TX.TransactionResult> => {
            if (!privateKey) {
                return new Promise((resolve, reject) => {
                    this._instance.createMonster(_name, txParams || this._sendParams)
                        .then((res: any) => resolve(res))
                        .catch((err: any) => reject(err));
                });
            } else {
                // tslint:disable-next-line:max-line-length
                return this.w3.sendSignedTransaction(this.address, privateKey, this._instance.createMonster.request(_name).params[0].data, txParams || this._sendParams, undefined)
                    .then(txHash => {
                        return this.waitTransactionReceipt(txHash);
                    });
            }
        },
        {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:variable-name
            sendTransaction: Object.assign((_name: string, txParams?: W3.TX.TxParams): Promise<string> => {
                    return new Promise((resolve, reject) => {
                        this._instance.createMonster.sendTransaction(_name, txParams || this._sendParams)
                            .then((res: any) => resolve(res))
                            .catch((err: any) => reject(err));
                    });
                },
                {
                    // tslint:disable-next-line:max-line-length
                    // tslint:disable-next-line:variable-name
                    sendSigned: (_name: string, privateKey: string, txParams?: W3.TX.TxParams, nonce?: number): Promise<string> => {
                        // tslint:disable-next-line:max-line-length
                        return this.w3.sendSignedTransaction(this.address, privateKey, this._instance.createMonster.request(_name).params[0].data, txParams || this._sendParams, nonce);
                    }
                }
            )
        },
        {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:variable-name
            data: (_name: string): Promise<string> => {
                return new Promise((resolve, reject) => {
                    resolve(this._instance.createMonster.request(_name).params[0].data);
                });
            }
        },
        {
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:variable-name
            estimateGas: (_name: string): Promise<number> => {
                return new Promise((resolve, reject) => {
                    this._instance.createMonster.estimateGas(_name).then((g: any) => resolve(g)).catch((err: any) => reject(err));
                });
            }
        });
    
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:variable-name
    public getMonsterCount( txParams?: W3.TX.TxParams): Promise<BigNumber> {
        return new Promise((resolve, reject) => {
            this._instance.getMonsterCount
                .call( txParams || this._sendParams)
                .then((res: any) => resolve(res))
                .catch((err: any) => reject(err));
        });
    }
    
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:variable-name
    public getMonster(_id: BigNumber | number, txParams?: W3.TX.TxParams): Promise<any> {
        return new Promise((resolve, reject) => {
            this._instance.getMonster
                .call(_id, txParams || this._sendParams)
                .then((res: any) => resolve(res))
                .catch((err: any) => reject(err));
        });
    }
    
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:variable-name
    public getMonsters( txParams?: W3.TX.TxParams): Promise<any> {
        return new Promise((resolve, reject) => {
            this._instance.getMonsters
                .call( txParams || this._sendParams)
                .then((res: any) => resolve(res))
                .catch((err: any) => reject(err));
        });
    }
    
}
