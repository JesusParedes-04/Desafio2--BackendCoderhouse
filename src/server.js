import express from "express";
import ProductManager from "./productManager.js"

const app = express();
app.use(express.urlencoded({extended: true}))

const productManage = new ProductManager()
const readProducts = productManage.readingGetProducts();



app.get("/products", async (req, res) => {
let limit = parseInt(req.query.limit)

if(!limit) return res.send(await readProducts)

let allProducts = await readProducts
let productLimit = allProducts.slice(0,limit)
//LLamado a todos los productos
res.send(productLimit)

})


app.get("/products/:id", async (req, res) => {

let id = parseInt(req.params.id)
let allProducts = await readProducts;
let getProductsById = allProducts.find(productItem => productItem.id === id)
res.send(getProductsById)
})

const PORT = 8080
const server = app.listen(PORT, ()=>{
    console.log(`Express by local host ${server.address().port}`)
})
//Dar inicio al puerto
server.on("error", (error)=>console.log(`Error from server ${error}`))