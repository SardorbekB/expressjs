//express da http get, post, put so`rovlari

const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

const brands = [
    {id: 1, title: 'Apple'},
    {id: 2, title: 'Samsung'},
    {id: 3, title: 'Amazon'}
];

app.get('/brands', (req, res) => {
    res.send(brands);
});

app.post('/brands', (req, res) => {
    const {error} = validateBrand(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    let brand = {
        id: brands.length + 1,
        title: req.body.title
    }

    brands.push(brand);

    res.status(201).send(brand);
});

app.put('/brands/:id', (req, res) => {
    const {error} = validateBrand(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);;
    }

    let brand = brands.find(b => b.id == req.params.id);

    if(!brand) {
        return res.status(404).send('berilgan idli brand topilmadi');
    }

    brand.title = req.body.title;

    res.send(brand);
});


function validateBrand(brand) {
    const brandSchema = Joi.object({
        title: Joi.string().required().min(2).max(50)
    });

    const result = brandSchema.validate({
        title: brand.title
    });

    return result;
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(port, ' - portni tinglayapmiz!');
});