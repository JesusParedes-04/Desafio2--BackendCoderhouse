import {promises as fs} from "fs"

export default class ProductManager {

constructor(){
    this.path = "./product.txt"
    this.productsArray = []
}

static id = 0

addProduct = async (title, description, price, thumbnail, code, stock) => {

ProductManager.id++

let newProduct = {

title,
description,
price,
thumbnail,
code,
stock,
id: ProductManager.id
}

//Agregar producto al array vacio
this.productsArray.push(newProduct)

//Leyendo y transformando el objeto a string:
await fs.writeFile(this.path, JSON.stringify(this.productsArray))

}

//Leer archivos 
readingGetProducts = async () => {
    let response = await fs.readFile(this.path, 'utf-8')
//Mostrar response como objeto
return JSON.parse(response)


}

getProducts = async () => {
//Creamos variable que va esperar que se resuelva la funcion anterior
let responseTwo = await this.readingGetProducts()
return console.log(responseTwo)


}
//Filtrado por ID
getProductsById = async (id) => {

let responseThree = await this.readingGetProducts()

if(!responseThree.find(productManage => productManage.id === id)){

    console.log('Product no found')
}else {

    console.log(responseThree.find(productManage=> productManage.id ===id))
}


}

deleteProductsById = async (id) => {

let responseThree = await this.readingGetProducts()
let productFilter = responseThree.filter(productManage=> productManage.id != id)
await fs.writeFile(this.path, JSON.stringify(productFilter))
console.log('delated product')

}

updateProducts = async({id, ...updatedProduct})=>{
await this.deleteProductsById(id)
let productOld = await this.readingGetProducts(
)

let productsModify = [

    {
        ...updatedProduct, id  
    }, ...productOld
]
await fs.writeFile(this.path,JSON.stringify(productsModify))
}


}

// const productManage = new ProductManager

// productManage.addProduct('Test Title', 'this is a test description' , 200, 'no image', '123abc' , 25)
// productManage.addProduct('Test Title2', 'this is a test description2' , 2200, 'no image2', '2123abc' , 225)
// productManage.addProduct('Test Title3', 'this is a test description3' , 3200, 'no image3', '2125abc' , 1225)
// productManage.addProduct('Test Title4', 'this is a test description4' , 4200, 'no image4', '2125abc' , 1225)
// productManage.addProduct('Test Title5', 'this is a test description5' , 5200, 'no image5', '2125abc' , 1225)
// productManage.addProduct('Test Title6', 'this is a test description6' , 6200, 'no image6', '2125abc' , 1225)

// productManage.getProductsById(1)

// productManage.getProducts()


//  productManage.updateProducts({

// title: 'Test Title',
// description: 'this is a test description',
// price: 500,
// thumbnail: 'no image',
// code: '123abc',
// stock: 25,
// id: 1

//  })