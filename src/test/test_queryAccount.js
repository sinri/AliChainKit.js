const env = require('./test_env')
env.api.queryAccount(env.accountName)
.then(data=>{
    console.log(data)
    console.log(data.data())
    console.log(data.data().auth_map())
    console.log("account name: "+env.accountName+" identity: "+data.data().identity())
})
