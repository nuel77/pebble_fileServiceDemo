var express = require('express');   //Express Web Server 
var bodyParser = require('body-parser'); //connects bodyParsing middleware
const ipfsClient = require('ipfs-http-client');
const BufferList = require('bl/BufferList');
var expressFileupload = require("express-fileupload")
const bs58=require('bs58')
const grpc = require('grpc');
const pebble_server="3.6.193.80"
const services = require('../node/server/worker_grpc_pb')
const dataStr = require('../node/server/worker_pb')
const client = new services.workerClient(
  'localhost:50051',
    grpc.credentials.createInsecure()
)
var stream=require('stream')
var http = require('http').createServer(app);
const {BufferListStream }=require('bl')


//ipfs variables 

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
  let filename=req.files.foo.name
  let contentType=req.files.foo.mimetype

  console.log(filename)
  console.log(contentType)

  addf(files1,(val)=>{
      val.name=req.files.foo.name
      res.send(val)
  },filename,contentType);
  
  
});

//file download path

app.post('/download',(req,res)=>{
  let searchCID=req.body.searchName

  getfile(searchCID,(fileContents)=>{ 
    getGautham(searchCID,(response)=>{
      let currentState = response.getCurrentstate()     
      currentState=Buffer.from(currentState, 'base64').toString()
      currentState=JSON.parse(currentState)

    res.set('Content-disposition', 'attachment; filename=' + currentState["filename"]);
    res.set('Content-Type', currentState["contentType"]);
    res.append('name',currentState["filename"] );

    //console.log(res)
    fileContents.on('end',()=>res.end())
    fileContents.pipe(res)
    })

  })
  

})



async function getfile(validCID,callback){
  for await (const file of ipfs_api.get(validCID)) {
    console.log(file.path)
    const content = new BufferListStream()
    for await (const chunk of file.content) {
      content.append(chunk)
    }
    // let buff=Buffer.concat(content)
    //console.log(content.type)
    return callback(content)
  }


}

//to upload to ipfs
async function addf(filepath,callback,filename,contentType){
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

      callGautham(encmultivalue.toString(),linuxDate.toString(),filename,contentType,(addr)=>{
        stuff.addr=addr;
      })
      console.log(new Date().getTime())
      console.log(stuff)
      return callback(stuff)
    }
  
  }catch(e){
    console.log(e)
    
  }
  

}
async function getGautham(cid,callback){
  const request = new dataStr.addressCreation()
  console.log(cid)
  console.log(typeof(cid))
  request.setAuthpublickey(cid)
  request.setContractid("DEMO")
  request.setChannelid("PEBBLE_INC")
  request.setUniqueIdentifier("")
  const client = new services.workerClient(
    'localhost:50051',
      grpc.credentials.createInsecure()
  )
  client.getAddressData(request,(error,response)=>{
    if(!error){
        
        // client.close()
        return callback(response)
    }else{
        console.log(error)
    }
})
}

//calling the grpc 
function callGautham(cid,datetime,filename,contentType,callback){
  const client = new services.workerClient(
    'localhost:50051',
      grpc.credentials.createInsecure()
  )
  let currentState = {
    "filename":filename,
    "time":datetime,
    "cid":cid,
    "contentType":contentType
  }
  const request = new dataStr.addressCreation()
  
  request.setCurrentstate(Buffer.from(JSON.stringify(currentState)).toString('base64'))
  request.setContractid("DEMO")
  request.setChannelid("PEBBLE_INC")
  request.setUniqueIdentifier("")
  console.log(typeof(cid))
  request.setAuthpublickey(cid)
  client.createAddress(request,(error,response)=>{
      if(!error){
          console.log(response.getStatuscode());
          return callback(cid)
      }else{
          console.log(error)
      }
  })
}




var server = app.listen(5030, function() {
console.log('Listening on port %d', server.address().port);
});