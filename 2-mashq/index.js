//express da http get va http put so`rovlari bilan ishlash
const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

const users = [
    {id: 1, name: 'Sardorbek', email: "qilichovsardorbekb@gmail.com", password: '12345678'},
    {id: 2, name: "Akmal", email: "Akmal@gmail.com", password: "87654321"}
];

app.get('/users', (req, res) => {
    res.send(users);
});

app.post('/users', (req, res) => {
    const userSchema = Joi.object({
        name: Joi.string().required().min(3).max(30),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });
    const result = userSchema.validate({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    if(result.error) {
        return res.status(400).send(result.error.details[0].message);
    }

    let user = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    users.push(user);
    res.status(201).send(user);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`${port} - portni eshitishni boshladim`);
});