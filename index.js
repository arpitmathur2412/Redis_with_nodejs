const express=require("express");
const app=express()
const redis=require("redis")

const redisClient = redis.createClient(6379,'127.0.0.1');

redisClient.connect()
redisClient.on("connect", (err)=>{
    if(err){
        console.log(err)
    }
    else console.log("connected to redis-server")
} );

app.get("/",(req,res)=>{
    res.send("Hello")
})

app.get("/set",(req,res)=>{
    res.send("set page")
})

app.post("/set",async(req,res)=>{
    let key= await req.body.key
    let value= await req.body.value
    await redisClient.set(key,value)
    res.send("done")
})

app.get("/get",async(req,res)=>{
    // const key=req.body.key
    const response=await redisClient.get("name")
    res.json(response);
})

app.listen(5000, () =>{
  console.log("Server listening on http://localhost:5000");
});
