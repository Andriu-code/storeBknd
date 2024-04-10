const { ObjectId } = require('mongodb');

const { Database } = require('../database/index');

const { ProductsUtils } = require('../products/utils');

const COLLECTION = 'products';

const getAll = async () => {   // traer todos los productos
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();  //retorna toda la coleccion de producto y lo muestra como un array
}

const getById = async (id) => {  //traer algo por id
    const collection = await Database(COLLECTION);
    const objectId = new ObjectId(id)
    return await collection.findOne({ _id: objectId });
}

const create = async (product) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(product);
    return result.insertedId;
}

//update
//delete

const generateReport = async (name, res) => {
    let products = await getAll();
    ProductsUtils.excelGenerator(products, name, res)

}

module.exports.ProductsService = {
    getAll,
    getById,
    create,
    generateReport
}