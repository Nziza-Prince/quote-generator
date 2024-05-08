let http=require('http')
let fs=require('fs')

http.createServer(function (req,res){
    fs.readFile('quote.html',function(err,data){
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write(data)
        return res.end()
    })
}).listen(3000,()=>{
    console.log('it is now running')
})

let events=require('events')
let eventEmitter=new events.EventEmitter()

let screamhandler= ()=>{console.log('someone is screaming')}
let playingmhandler= ()=>{console.log('someone is playing in the field')}

eventEmitter.on('playing',playingmhandler)
eventEmitter.on('scream',screamhandler)

eventEmitter.emit('playing');