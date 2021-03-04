//expressjs da http get, post, put, delete so`rovlari bilan ishlash
const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

const phones = [
    {id: 1, title: 'Samsung'},
    {id: 2, title: 'Iphone'},
    {id: 3, title: 'Huawei'}
];

app.get('/phones', (req, res) => {
    res.send(phones);
});

app.post('/phones', (req, res) => {
    const {error} = validatePhones(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    let phone = {
        id: phones.length + 1,
        title: req.body.title
    };

    phones.push(phone);

    res.send(phone);
});

app.put('/phones/:id', (req, res) => {
    const {error} = validatePhones(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    let phone = phones.find(p => p.id == req.params.id);

    if(!phone) {
        return res.status(404).send('berilgan idli phone topilmadi');
    }

    phone.title = req.body.title;

    res.send(phone);
});

app.delete('/phones/:id', (req, res) => {
    const phone = phones.find(p => p.id == req.params.id);
    if(!phone) {
        return res.status(404).send('berilgan idli phone topilmadi');
    }

    const indexPhone = phones.indexOf(phone);

    phones.splice(indexPhone, 1);

    res.send(phone);
})

function validatePhones(phone) {
    const phoneSchema = Joi.object({
        title: Joi.string().required().min(2).max(20)
    });

    const result = phoneSchema.validate({
        title: phone.title
    });

    return result;
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`${port} - portni eshtishni boshladim`);
});