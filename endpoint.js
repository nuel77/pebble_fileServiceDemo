const grpc = require('grpc');
const services = require('../vaillla_file/server/worker_grpc_pb')
const dataStr = require('../vaillla_file/server/worker_pb')

function main(){
    const client = new services.workerClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    )

    const request = new dataStr.addressCreation()
    request.setContractid("DEMO")
    request.setCurrentstate("")
    request.setChannelid("PEBBLE_INC")
    request.setUniqueIdentifier("DATE AND TIME")
    request.setAuthpublickey("CID")
    client.createAddress(request,(error,response)=>{
        if(!error){
            console.log(response.getStatuscode());
        }else{
            console.log(error)
        }
    })
}

main()