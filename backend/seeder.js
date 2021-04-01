// access environment variables
import dotenv from "dotenv"
import colors from "colors"
// sample data
import users from "./data/users.js"
import products from "./data/products.js"
// models
import User from "./models/userModel.js"
import Product from "./models/productModel.js"
import Order from "./models/orderModel.js"
// connector
import connectDB from "./config/db.js"

dotenv.config()

connectDB()
// deletes existing orders, products and users 
// and cretes users and products
const importData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id

        // add created by field on alll products
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser }
        })

        await Product.insertMany(sampleProducts)
        console.log('Data Imported!'.green.inverse)
        // successful exit
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data Destroyed!'.red.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

// node backend/seeder -d
// -d is third element
if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}