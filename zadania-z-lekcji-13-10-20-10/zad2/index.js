const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const fs = require('fs/promises');
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const router = express.Router();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'home.html'));
});

app.get('/kontakt', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'contact.html'));
});

app.post('/kontakt', (req, res) => {
  const name = req.body.text;
  const email = req.body.email;
  const select = req.body.topic;
  const textarea = req.body.msg;
  res.redirect('/');
  console.log(`Name: ${name}, email: ${email}, topic: ${select}, message: ${textarea}`);
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

router.get('/students', async (req, res) => {
  try {
    const data = await fs.readFile('./json/students.json', 'utf8');
    const students = JSON.parse(data);
    const formattedStudents = students.map(student => `<li>{id: ${student.id}, name: ${student.name}, surname: ${student.surname}, email: ${student.email}},</li>`);

    res.setHeader('Content-Type', 'text/html');
    res.send(`<ul>${formattedStudents.join('')}</ul>`);
  } catch (err) {
    throw err;
  }
});

router.get('/students/:id', async (req, res) => {
  try {
    const data = await fs.readFile('./json/students.json', 'utf8');
    const students = JSON.parse(data);
    const student = students.find(student => student.id === parseInt(req.params.id));
    res.setHeader('Content-Type', 'text/html');
    student ? res.send(`<ul><li>{id: ${student.id}, name: ${student.name}, surname: ${student.surname}, email: ${student.email}},</li></ul>`) : res.status(404).send('Student not found');
  } catch (err) {
    throw err;
  }
});

router.get('/subjects', async (req, res) => {
  try {
    const data = await fs.readFile('./json/subjects.json', 'utf8');
    const subjects = JSON.parse(data);
    const formattedSubjects = subjects.map(subject => `<li>{id: ${subject.id}, name: ${subject.name}, hoursAWeek: ${subject.hoursAWeek}},</li>`);

    res.setHeader('Content-Type', 'text/html');
    res.send(`<ul>${formattedSubjects.join('')}</ul>`);
  } catch (err) {
    throw err;
  }
})

router.get('/subjects/:id', async (req, res) => {
  try {
    const data = await fs.readFile('./json/subjects.json', 'utf8');
    const subjects = JSON.parse(data);
    const subject = subjects.find(subject => subject.id === parseInt(req.params.id));
    res.setHeader('Content-Type', 'text/html');
    subject ? res.send(`<ul><li>{id: ${subject.id}, name: ${subject.name}, hoursAWeek: ${subject.hoursAWeek}},</li></ul>`) : res.status(404).send('Subject not found')
  } catch (err) {
    throw err;
  }
});

app.use('/api', router);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
