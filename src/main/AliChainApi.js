const AliChainContract = require("./AliChainContract");
const AliChainApiResult = require("./entity/AliChainApiResult");
const AliChainContractEntity = require("./entity/AliChainContractEntity");
const AliChainEntity = require("./entity/AliChainEntity");
const AliChainAccountEntity = require("./entity/AliChainAccountEntity");
const AliChainTransactionEntity = require("./entity/AliChainTransactionEntity");
const AliChainTransactionReceiptEntity = require("./entity/AliChainTransactionReceiptEntity");
const AliChainBlockHeaderEntity = require("./entity/AliChainBlockHeaderEntity");
const AliChainBlockEntity = require("./entity/AliChainBlockEntity");

class AliChainApi {
    constructor(ctr) {
        this._ctr = ctr
    }

    _api() {
        return this._ctr
    }

    /**
     * 创建账户
     * CreateAccount 接口用于在链上创建一个新的账户。
     * @param from string    使用的账户名，用此账户来创建新账户。
     * @param to string    创建的新账户名。
     * @param data object    数据内容，包含创建账户需要的数据。
     * @param callback (err,data)=>{}
     */
    createAccount(from, to, data, callback) {
        // todo promise
        this._api().CreateAccount(
            {
                from: from,
                to: to,
                data: data
            },
            callback
        )
    }

    /**
     * 转账
     * TransferBalance 接口用于从一个账户转账到另一个账户。
     * @param from string    使用的账户名
     * @param to string    转账的目标账户名
     * @param value number    转账额度
     * @param callback callback (err,data)=>{}
     */
    transferBalance(from, to, value, callback) {
        // todo promise
        this._api().TransferBalance({
            from: from,
            to: to,
            value: value
        }, callback)
    }

    /**
     * 预重置公钥
     * PreResetPubKey 接口用来预重置一个账户的公钥。
     * @param from string    需要配置的当前账户名
     * @param callback callback (err,data)=>{}
     */
    preResetPubKey(from, callback) {
        // todo promise
        this._api().PreResetPubKey({
            from: from
        }, callback)
    }

    /**
     * 重置公钥
     * ResetPubKey 接口用来重置一个账户的公钥。
     * @param from string    需要配置的当前账户名
     * @param data object    数据字段 {auth_key:0x64,auth_weight:100}
     * @param callback callback (err,data)=>{}
     */
    resetPubKey(from, data, callback) {
        // todo promise
        this._api().ResetPubKey({
            from: from,
            data: data
        }, callback)
    }

    /**
     * 更新权重
     * UpdateAuthMap 接口用于更新一个账户的公钥的权重值。
     * @param from string    需要配置的当前账户名
     * @param data object    数据字段
     * @param callback callback (err,data)=>{}
     */
    updateAuthMap(from, data, callback) {
        // todo promise
        this._api().UpdateAuthMap({
            from: from,
            data: data
        }, callback)
    }

    /**
     * 构造合约实例
     * contract 用来构造一个合约实例，后续可部署、调用该合约。
     * @param contract_class class extends AliChainContract
     * @param name string 目标合约的名称，此名称计算哈希后即是此合约的 identity。(带上时间戳，防止合约名计算哈希后已存在)
     * @param abi string ABI 定义的 JSON 格式字符串。
     * @param vmType string OPTIONAL 合约平台支持 Solidity 语言，默认配置为 chain.EVM。
     * @returns AliChainContract 初始化一个合约实例
     */
    contract(contract_class, name, abi, vmType) {
        // vmType default as chain.EVM
        return new contract_class(this._api().contract(name, abi))
    }

    /**
     *
     * @param block_number {number} 目标区块高度值
     * @returns {Promise<unknown>}
     */
    queryBlockHeaderWithBlockNumber(block_number) {
        return this._queryBlockHeader(block_number, false)
    }

    /**
     *
     * @param hash {string} 目标区块的哈希值，为 16 进制表示，需“0x”作为前缀。
     * @returns {Promise<unknown>}
     */
    queryBlockHeaderWithBlockHash(hash) {
        return this._queryBlockHeader(false, hash)
    }

    /**
     * 查询区块头
     * QueryBlockHeader 用于查询指定的区块头，可按照区块高度 number 或者区块哈希 hash 查询目标区块头。
     * @param block_number number    目标区块高度值
     * @param hash string    目标区块的哈希值，为 16 进制表示，需“0x”作为前缀。
     */
    _queryBlockHeader(block_number, hash) {
        return new Promise((resolve, reject) => {
            let data = {}
            if (!block_number && !hash) {
                reject(new Error("两个参数必须使用其中一个"))
                return
            }
            if (block_number) {
                data.block_number = block_number
            }
            if (hash) {
                data.hash = hash
            }
            this._api().QueryBlockHeader(data, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    let QueryBlockHeaderResult = class extends AliChainApiResult {
                        block_header() {
                            return new AliChainBlockHeaderEntity(this.get('block_header'))
                        }
                    }
                    resolve(new QueryBlockHeaderResult(data))
                }
            })
        })

    }

    /**
     * 查询区块
     * QueryLastBlock
     * 查询最后一个区块。该接口无需请求参数。
     */
    queryLastBlock() {
        return new Promise((resolve, reject) => {
            this._api().QueryLastBlock({}, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    let QueryLastBlockResult = class extends AliChainApiResult {
                        block(){
                            return new AliChainBlockEntity(this.get('block'))
                        }
                    }
                    resolve(new QueryLastBlockResult(data))
                }
            })
        })

    }

    /**
     *
     * @param block_number {number}    目标区块高度值
     * @returns {Promise<unknown>}
     */
    queryBlockWithBlockNumber(block_number) {
        return this._queryBlock(block_number, false)
    }

    /**
     *
     * @param hash {string}    目标区块的哈希值，为 16 进制表示，需“0x”作为前缀。
     * @returns {Promise<unknown>}
     */
    queryBlockWithBlockHash(hash) {
        return this._queryBlock(false, hash)
    }

    /**
     * QueryBlock
     * 查询指定的区块，可按照区块高度 number 或者区块哈希 hash 查询目标区块。
     * @param block_number  number    目标区块高度值
     * @param hash string    目标区块的哈希值，为 16 进制表示，需“0x”作为前缀。
     */
    _queryBlock(block_number, hash) {
        return new Promise((resolve, reject) => {
            let data = {}
            if (!block_number && !hash) {
                reject(new Error("两个参数必须使用其中一个"))
                return
            }
            if (block_number) {
                data.block_number = block_number
            }
            if (hash) {
                data.hash = hash
            }
            this._api().QueryBlock(data, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    let QueryBlockResult = class extends AliChainApiResult {
                        block(){
                            return new AliChainBlockEntity(this.get('block'))
                        }
                    }
                    resolve(new QueryBlockResult(data))
                }
            })
        })

    }

    /**
     * 查询交易
     * QueryTransaction 用于查询指定的交易，通过交易哈希查询。
     * @param hash string    目标交易的哈希值，为 16 进制表示，需“0x”作为前缀。
     */
    queryTransaction(hash) {
        return new Promise((resolve, reject) => {
            this._api().QueryTransaction({hash: hash}, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    let QueryTransactionResult = class extends AliChainApiResult {
                        transaction() {
                            return new AliChainTransactionEntity(this.get('transaction'))
                        }

                        transaction_index() {
                            return this.get('transaction_index')
                        }
                    }
                    resolve(new QueryTransactionResult(data))
                }
            })
        })

    }

    /**
     * 查询收据
     * QueryTransactionReceipt 用于查询指定的交易收据，通过交易哈希查询。
     * @param hash string    目标交易的哈希值，为 16 进制表示，需“0x”作为前缀。
     */
    queryTransactionReceipt(hash) {
        return new Promise((resolve, reject) => {
            this._api().QueryTransactionReceipt({hash: hash}, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    let QueryTransactionReceiptResult = class extends AliChainApiResult {
                        block_number() {
                            return this.get('block_number')
                        }

                        receipt() {
                            return new AliChainTransactionReceiptEntity(this.get('receipt'))
                        }

                        transaction_index() {
                            return this.get('transaction_index')
                        }
                    }
                    resolve(new QueryTransactionReceiptResult(data))
                }
            })
        })

    }

    /**
     * 查询账户
     * QueryAccount 用于查询指定账户，需给定目标账户的 name，接口会通过计算传入的 name 哈希值作为目标账户 identity；
     * 也可以直接给定目标账户的 identity 的 16 进制字符串，且以“0x”为前缀。
     * @param from string    目标账户 name（非“0x”前缀）或 identity 的 16 进制表示（以“0x”为前缀）。如果是 name，接口会通过计算 name 的哈希得到此账户 identity。
     * @param callback (err, data) => {}
     * @constructor
     */
    queryAccount(from, callback) {
        return new Promise((resolve, reject) => {
            this._api().QueryAccount({from: from}, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    let QueryAccountResult = class extends AliChainApiResult {
                        data() {
                            return new AliChainAccountEntity(this.get('data'))
                        }
                    }
                    resolve(new QueryAccountResult(data))
                }
                //callback(err,new AliChainApiResultWithDataAsAccount(data))
            })
        })

    }

    /**
     * 查询合约账户
     * QueryContract 查询指定合约账户，需给定目标合约的 name，接口会通过计算传入的 name 哈希值作为目标合约 identity；
     * 也可以直接给定目标合约的 identity 的 16 进制字符串，且以“0x”为前缀。
     * @param from string    目标合约 name（非“0x”前缀）或 identity 的 16 进制表示（以“0x”为前缀）。如果是 name，接口会通过计算 name 的哈希得到此合约。
     * @param callback (err, data) => {}
     */
    queryContract(from, callback) {
        return new Promise((resolve, reject) => {
            this._api().QueryContract({from: from}, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    let QueryContractResult = class extends AliChainApiResult {
                        data() {
                            return new AliChainAccountEntity(this.get('data'))
                        }
                    }
                    resolve(new QueryContractResult(data))
                }
            })
        })

    }

    // todo LocalTransaction

    /**
     * 为方便存证场景的开发，合约平台提供原生存证交易接口以实现存证目的。
     * NativeDepositData
     * 原生存证交易接口将目标数据在合约链上存证。
     * 说明：存证交易的数据 payload 在大小上有上限限制，为合约链的一个配置项，通常默认限制为 1 MB，实际根据合约链的配置情况而定。
     * @param from string    当前交易使用的账户
     * @param to string    存证的目标账户
     * @param data_payload string    内容为以“0x”开头的 16 进制字符串，存证数据序列化为 16 进制的内容。
     * @param callback (err, data) => {}
     */
    nativeDepositData(from, to, data_payload, callback) {
        // todo promise
        this._api().NativeDepositData({
            from: from,
            to: to,
            data: {
                payload: data_payload
            },
            callback
        })
    }
}

module.exports =
    AliChainApi
