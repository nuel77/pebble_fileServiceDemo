var express = require('express');   //Express Web Server 
var bodyParser = require('body-parser'); //connects bodyParsing middleware
const ipfsClient = require('ipfs-http-client');
const BufferList = require('bl/BufferList');
var expressFileupload = require("express-fileupload")
const bs58=require('bs58')
const grpc = require('grpc');
const services = require('../vaillla_file/server/worker_grpc_pb')
const dataStr = require('../vaillla_file/server/worker_pb')

var http = require('http').createServer(app);


//ipfs variables 
const pebble_server="3.6.193.80"
const ipfs_gateway =ipfsClient('/ip4/'+pebble_server+'/tcp/8080')
const ipfs_api = ipfsClient('/ip4/'+pebble_server+'/tcp/5001')



var app = express();
app.use(expressFileupload())
app.use(express.static("public"))
app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/index.html")
})

app.get("/fetch",(req,res)=>{
  res.send("everyting allright here man")
})



/* ========================================================== 
 //file uploads
============================================================ */
app.use(bodyParser({defer: true}));
app.post('/upload', function(req, res) {

  console.log(req.files.foo); // the uploaded file object
  files1=[{
    path:req.files.foo.name,
    content:req.files.foo.data
  }] 
  
  addf(files1,(val)=>{
      val.name=req.files.foo.name
      res.send(val)
  });
  
});

//file download path

app.post('/download',(req,res)=>{
  let searchCID=req.body.searchName
  let content=getfile(searchCID)
  console.log(content)

})

//ipfs gateway

//to download from ipfs
// async function getfile(cid){
//   for await(const file of ipfs_api.files.get(cid)){
//     console.log(file.path)
//     const content=new BufferList()
//     for await(const chunk of file.content){
//       content.append(chunk)
//     }
//     console.log(content.toString())
//     return content
//   }
// }

async function getfile(validCID){
  for await (const file of ipfs_api.get(validCID)) {
    console.log(file.path)
    const content = new BufferList()
    for await (const chunk of file.content) {
      content.append(chunk)
    }
    console.log(content.toString())
  }


}

//to upload to ipfs
async function addf(filepath,callback){
  var stuff={
    cid:"",
    time:""
  }
  try{
  
    for await(const result of ipfs_api.add(filepath)){

      
      console.log(result)
      console.log(result.cid.multihash)
      let encmultivalue=bs58.encode(result.cid.multihash)
      console.log(bs58.encode(result.cid.multihash))

      stuff.cid=encmultivalue

      var currTime = new Date(new Date().getTime()).toLocaleTimeString("en-US")
      var linuxDate=new Date()
      console.log(currTime)

      stuff.time=currTime;

      callGautham(encmultivalue.toString(),linuxDate.toString())
      console.log(new Date().getTime())
      console.log(stuff)
      return callback(stuff)
    }
  
  }catch(e){
    console.log(e)
    
  }
  

}

//calling the grpc 
function callGautham(cid,datetime){
  const client = new services.workerClient(
      'localhost:50051',
      grpc.credentials.createInsecure()
  )

  const request = new dataStr.addressCreation()
  request.setContractid("DEMO")
  request.setCurrentstate("")
  request.setChannelid("PEBBLE_INC")
  request.setUniqueIdentifier(datetime)
  request.setAuthpublickey(cid)
  client.createAddress(request,(error,response)=>{
      if(!error){
          console.log(response.getStatuscode());
      }else{
          console.log(error)
      }
  })
}




var server = app.listen(5030, function() {
console.log('Listening on port %d', server.address().port);
});