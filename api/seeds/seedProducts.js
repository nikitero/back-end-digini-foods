//Requerir paquetes y librerias
const mongoose = require(`mongoose`);

//Conexión con Atlas
const dotenv = require("dotenv");
dotenv.config();
const mongoDb = process.env.MONGO_DB;

//Requerir los modelos
const Product = require(`../models/product.model`);

//Creación del listado semilla
const products = [
    {
        name: "Margarita",
        price: 10,
        ingredients: "Salsa de tomate, mozzarella, hojas frescas de albahaca",
        image: "https://www.annarecetasfaciles.com/files/pizza-margarita-1-scaled.jpg",
        category: "Pizzas",
        vegetarian: true,
        restaurant: "pizzeria",
    },
    {
        name: "Agua con gas",
        price: 3,
        ingredients: "agua",
        image: "https://www.bodecall.com/images/stories/virtuemart/product/agua-vichy-catalan-25-cl.png",
        category: "Bebidas",
        vegetarian: true,
    }
];
const productDocuments = products.map(product => new Product(product));
mongoose.set('strictQuery', true);
mongoose
    .connect(mongoDb, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        const allProducts = await Product.find();
        if (allProducts.length) {
        await Product.collection.drop();
        }
    })
    .catch((err) => console.log(`Error deleting data: ${err}`))
    .then(async () => {
            await Product.insertMany(productDocuments);
        console.log('Database Created')
        })
    .catch((err) => console.log(`Error creating data: ${err}`))
    .finally(() => mongoose.disconnect());