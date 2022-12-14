const express = require("express");
const axios = require('axios');
const User = require("./model/user");
const cors = require('cors')
require("./config/database").connect();

const exchangeURL = 'https://api.exchangerate.host/latest';
const app = express();
app.use(express.json());
app.use(cors());

async function getExchangeRate() {
    try {
        const response = await axios.get(exchangeURL);
        return response.data
    } catch (error) {
        console.error(error);
    }
}

app.get("/user/all", async (req, res) => {
    try {
        // check if user already exist
        // Validate if user exist in our database
        const users = await User.find({});
        // return new user
        return res.status(200).json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Failed to get users.");
    }
});

app.post("/user/add", async (req, res) => {
    try {
        // Get user input
        const { first_name, last_name, email } = req.body;
        if (!first_name || !last_name || !email) {
            return res.status(400).send("first_name, last_name, and email should be provided!");
        }
        
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist.");
        }

        // Create user in our database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
        });

        // return new user
        return res.status(201).json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Failed to add user.");
    }
});

app.put("/user/update", async (req, res) => {
    const { first_name, last_name, email } = req.body;
    if (!first_name || !last_name || !email) {
        return res.status(400).send("first_name, last_name, and email should be provided!");
    }
    const user = await User.findOneAndUpdate(
        { email: email }, 
        { first_name: first_name, last_name: last_name },
        { new: true }
    );
    if (user) {
        return res.status(201).send(user);
    }
    
    return res.status(409).send("User doesn't exist.");
});

app.delete("/user/delete", async (req, res) => {
    const { email } = req.body;
    const user = await User.findOneAndDelete({ email: email });
    if (user) {
        return res.status(201).send(user);
    }
    
    return res.status(409).send("User doesn't exist or delete failed");
})

app.get("/exchange/rate", async (req, res) => {
    const data = await getExchangeRate();
    res.status(200).send(data);
});

module.exports = app;