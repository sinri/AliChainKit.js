const AliChainKit = require("../main/AliChainKit");
const Config=require('./config')

const aliChain = new AliChainKit(
    Config.accountKeyFile,
    Config.accountPassword,
    Config.clientKeyFile,
    Config.clientKeyPassphrase,
    Config.clientCrtFile,
    Config.caCrtFile
)
const accountName=Config.accountName
aliChain.addServer('47.111.195.13', 18133)
    .addServer('47.111.195.13', 18131)
    .addServer('47.111.195.13', 18130)
    .addServer('47.111.195.13', 18132)
    .connect()

api=aliChain.api()

module.exports={
    accountName,
    aliChain,
    api
}