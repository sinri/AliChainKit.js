const Chain = require("@alipay/mychain/index.node") //在 node 环境使用 TLS 协议
const fs = require("fs")

const AliChainApi = require('./AliChainApi')

class AliChainKit {
    constructor(
        accountKeyFile, accountPassword,
        clientKeyFile, clientKeyPassphrase,
        clientCrtFile,
        caCrtFile
    ) {
        this.accountKeyFile = accountKeyFile
        this.accountPassword = accountPassword
        this.clientKeyPassphrase = clientKeyPassphrase
        this.clientKeyFile = clientKeyFile
        this.clientCrtFile = clientCrtFile
        this.caCrtFile = caCrtFile
        this.servers = []
        this._aliChain = null;
    }

    addServer(host, port) {
        this.servers.push({host: host, port: port})
        return this
    }

    connect() {
        const accountKey = fs.readFileSync(this.accountKeyFile, {encoding: "utf8"})
        const keyInfo = Chain.utils.getKeyInfo(accountKey, this.accountPassword)
        let opt = {
            clients: this.servers,
            timeout: 30000,       //连接超时时间配置
            cert: fs.readFileSync(this.clientCrtFile, {encoding: "utf8"}),
            ca: fs.readFileSync(this.caCrtFile, {encoding: "utf8"}),
            key: fs.readFileSync(this.clientKeyFile, {encoding: "utf8"}),
            userPublicKey: keyInfo.publicKey,
            userPrivateKey: keyInfo.privateKey,
            userRecoverPublicKey: keyInfo.publicKey,
            userRecoverPrivateKey: keyInfo.privateKey,
            passphrase: this.clientKeyPassphrase,
        }
        this._aliChain = Chain(opt)
        return this
    }

    api() {
        return new AliChainApi(this._aliChain.ctr)
    }

    _event() {
        return this._aliChain.event
    }

    // disconnect(){
    //     console.log(this._aliChain)
    // }

    static getHash(msg) {
        return Chain.utils.getHash(msg)
    }

    static getHashWithout0x(msg) {
        return Chain.utils.getHash(msg, true)
    }

    static toDecimal(value) {
        return Chain.utils.toDecimal(value)
    }

    static toUtf8(value) {
        return Chain.utils.toUtf8(value)
    }

    static getKeyInfo(pem, passphrase) {
        return Chain.utils.getKeyInfo(pem, passphrase)
    }
}


module.exports =
    AliChainKit