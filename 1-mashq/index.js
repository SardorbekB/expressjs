//expressjs da http get so`rovi 

const express = require('express');
const app = express();

const students = [
    {id: 1, firstName: "Sardorbek", lastName: "Qilichov"},
    {id: 2, firstName: "Akmal", lastName: "Rahimov"}
];

app.get('/', (req, res) => {
    res.send('TATU talabalari!');
});

app.get('/students', (req, res) => {
    res.send(students);
});

app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id == req.params.id);
    if(!student) {
        return res.status(404).send('Bu idli talaba topilmadi');
    }
    res.send(student);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`${port} - port tinglanmoqda`);
});