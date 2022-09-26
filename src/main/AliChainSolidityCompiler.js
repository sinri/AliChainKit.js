const fs = require("fs")
const solc = require("@alipay/solc")

class AliChainSolidityCompiler {
    /**
     *
     * @param solidityFile string file path
     */
    constructor(solidityFile) {
        this._solidityFile = solidityFile
        this._compileSolidityFileToAbi()
    }

    _compileSolidityFileToAbi() {
        //  solidityFile like './CreditManager.sol'
        const contract = fs.readFileSync(this._solidityFile, {encoding: 'ascii'})
        // 第二个参数设定为"1"，会开启编译优化 optimiser
        const output = solc.compile(contract, 1)
        this._abi = JSON.parse(output.contracts[':CreditManager'].interface)
        this._bytecode = output.contracts[':CreditManager'].bytecode
    }

    getAbi() {
        return this._abi
    }

    getByteCode() {
        return this._bytecode
    }
}

module.exports = AliChainSolidityCompiler