const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const fs = require('fs/promises');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const port = 3000

app.set('json spaces', 2);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const router = express.Router();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'home.html'));
});

app.get('/kontakt', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'contact.html'));
});

app.post('/kontakt', async (req, res) => {
  const name = req.body.text;
  const email = req.body.email;
  const select = req.body.topic;
  const textarea = req.body.msg;
  console.log(`Name: ${name}, email: ${email}, topic: ${select}, message: ${textarea}`);
  res.redirect('/');
});

router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile('./json/links.json', 'utf8');
    const links = JSON.parse(data);
    const formattedLinks = JSON.stringify(links, null, 2);
    res.set('Content-Type', 'application/json');
    res.send(formattedLinks);
  } catch (err) {
    throw err;
  }
});

const playersData = [
  { id: 23, name: 'LeBron', surname: 'James', email: 'lebronjames@gmail.com' },
  { id: 35, name: 'Kevin', surname: 'Durant', email: 'kevindurant@gmail.com' },
  { id:30, name: 'Stephen', surname: 'Curry', email: 'stephencurry@gmail.com' },
  { id: 2, name: 'Kawhi', surname: 'Leonard', email: 'kawhileonard@gmail.com' },
  { id:34, name: 'Giannis', surname: 'Antetokounmpo', email: 'giannis@gmail.com' },
  { id: 3, name: 'Anthony', surname: 'Davis', email: 'anthonydavis@gmail.com' },
  { id: 77, name: 'Luka', surname: 'Doncic', email: 'lukadoncic@gmail.com' },
  { id: 0, name: 'Damian', surname: 'Lillard', email: 'damianlillard@gmail.com' },
  { id:21, name: 'Joel', surname: 'Embiid', email: 'joelembiid@gmail.com' },
  { id: 15, name: 'Nikola', surname: 'Jokic', email: 'nikolajokic@gmail.com' },
];

const subjectsData = [
  { name: 'Matematyka', hoursAWeek: 5 },
  { name: 'Historia', hoursAWeek: 3 },
  { name: 'Fizyka', hoursAWeek: 4 },
  { name: 'Chemia', hoursAWeek: 3 },
  { name: 'Język angielski', hoursAWeek: 4 },
  { name: 'Biologia', hoursAWeek: 3 },
  { name: 'Informatyka', hoursAWeek: 5 },
  { name: 'Wychowanie fizyczne', hoursAWeek: 2 },
  { name: 'Geografia', hoursAWeek: 3 },
  { name: 'Sztuka', hoursAWeek: 2 },
];

router.get('/students', async (req, res) => {
  try{
    const students = await prisma.students.findMany();
    const format = students.map(student => `<li>{id: ${student.id}, name: ${student.name}, surname: ${student.surname}, email: ${student.email}}</li>`)
    res.setHeader('Content-Type', 'text/html');
    res.send(`<ul>${format.join('')}</ul>`);
  }catch (err){
    console.error('Wystąpił błąd:', err);
    res.status(500).send('Wystąpił błąd podczas przetwarzania zapytania.');
  }
});

router.get('/students/:id', async (req, res) => {
  try {
    const students = await prisma.students.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    students ? res.send(`<ul><li>{id: ${students.id}, name: ${students.name}, surname: ${students.surname}, email: ${students.email}}</li></ul>`) : res.status(404).send('Student not found');
  } catch (err) {
    console.error('Wystąpił błąd:', err);
    res.status(500).send('Wystąpił błąd podczas przetwarzania zapytania.');
  }
});

router.get('/subjects', async (req, res) => {
  try{
    const subjects = await prisma.subjects.findMany();
    const format = subjects.map(subject => `<li>{id: ${subject.id}, name: ${subject.name}, hoursAWeek: ${subject.hoursAWeek}}</li>`)
    res.setHeader('Content-Type', 'text/html');
    res.send(`<ul>${format.join('')}</ul>`);
  }catch (err){
    console.error('Wystąpił błąd:', err);
    res.status(500).send('Wystąpił błąd podczas przetwarzania zapytania.');
  }
});

router.get('/subjects/:id', async (req, res) => {
  try {
    const subjects = await prisma.subjects.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    subjects ? res.send(`<ul><li>{id: ${subjects.id}, name: ${subjects.name}, hoursAWeek: ${subjects.hoursAWeek}}</li></ul>`) : res.status(404).send('Subject not found');
  } catch (err) {
    console.error('Wystąpił błąd:', err);
    res.status(500).send('Wystąpił błąd podczas przetwarzania zapytania.');
  }
});

app.use('/api', router);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
