class AliChainContract {
    constructor(contract) {
        this._contract = contract
    }

    /**
     * 部署合约
     * new 用于部署一个合约。
     * @param bytecode string 目标合约的字节码，为 16 进制表示，无需“0x”作为前缀。
     * @param data_from string 需要配置的当前账户名
     * @param data_parameters Array OPTIONAL 如果合约包含初始化函数，并且此函数需要参数列表，可以通过 parameters 传递。
     * @param callback (err, contract, data) => {}
     */
    new(bytecode, data_from, data_parameters, callback) {
        let data = {from: data_from}
        if (data_parameters) {
            data.parameters = data_parameters
        }
        this._contract.new(bytecode, data, callback)
    }

    /**
     * 调用合约
     * 直接使用目标合约方法名，完成合约方法调用。
     * @param parameters array 不确定length, 参考具体的合约方法参数列表，参数个数不确定。
     * @param data_from string 需要配置的当前账户名。
     * @param callback (err, output, data) => {}
     */
    execute(parameters, data_from, callback) {
        let args = []
        if (parameters.length > 0) {
            for (let i = 0; i < parameters.length; i++) {
                args.push(parameters[i])
            }
        }
        args.push({from: data_from})
        args.push(callback)
        // TODO function is various
    }

    /**
     * 升级合约
     * update对一个链上已存在合约进行升级。谨慎使用合约升级功能，合约升级需要兼容新旧合约的数据存储，正常情况下，不建议使用。
     * @param bytecode string 目标合约的字节码，为 16 进制表示，无需“0x”作为前缀。
     * @param callback (err, contract, data) => {}
     *
     * 说明
     * 升级合约时，传入的bytecode字节码是runtime字节码，
     * 使用二进制 solc 编译工具的--bin-runtime参数可以直接得到，
     * 是正常--bin参数编译的字节码的子集。
     * runtime字节码通过本地执行合约部署操作也可获取到。
     * @see https://help.aliyun.com/document_detail/109642.html#h2-u8C03u7528u5408u7EA63
     */
    update(bytecode, callback) {
        this._contract.update(bytecode, {}, callback)
    }
}

module.exports=AliChainContract