const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const fs = require('fs/promises');
const mysql = require('mysql2');
const util = require('util');
const port = 3000

app.set('json spaces', 2);

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root', 
  password: 'root',
  database: 'webDB',
  port: 3307,
})

connection.connect((err) => {
  if (err) {
    console.error('Błąd połączenia z bazą danych:', err);
  } else {
    console.log('Połączenie z bazą danych zostało nawiązane.');
  }
});

const query = util.promisify(connection.query).bind(connection);

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
  try {
    await query('INSERT INTO Messages (name, email, topic, message) VALUES (?, ?, ?, ?)', [name, email, select, textarea]);
  } catch (err) {
    console.error('Wystąpił błąd:', err);
    res.status(500).send('Wystąpił błąd podczas przetwarzania zapytania.');
  }
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

router.get('/students', async (req, res) => {
  try {
    const results = await query('SELECT * FROM Students');
    const formattedStudents = results.map(student => `<li>{id: ${student.idStudents}, name: ${student.name}, surname: ${student.surname}, email: ${student.email}}</li>`);
    res.setHeader('Content-Type', 'text/html');
    res.send(`<ul>${formattedStudents.join('')}</ul>`);
  } catch (err) {
    console.error('Wystąpił błąd:', err);
    res.status(500).send('Wystąpił błąd podczas przetwarzania zapytania.');
  }
});

router.get('/students/:id', async (req, res) => {
  try {
    const results = await query('SELECT * FROM Students');
    
    const student = results.find(student => student.idStudents === parseInt(req.params.id));
    
    res.setHeader('Content-Type', 'text/html');
    student ? res.send(`<ul><li>{id: ${student.idStudents}, name: ${student.name}, surname: ${student.surname}, email: ${student.email}}</li></ul>`) : res.status(404).send('Student not found');
  } catch (err) {
    console.error('Wystąpił błąd:', err);
    res.status(500).send('Wystąpił błąd podczas przetwarzania zapytania.');
  }
});

router.get('/subjects', async (req, res) => {
  try {
    const results = await query('SELECT * FROM Subjects');
    
    const formattedSubjects = results.map(subject => `<li>{id: ${subject.idSubjects}, name: ${subject.name}, hoursAWeek: ${subject.hoursAWeek}}</li>`);
    
    res.setHeader('Content-Type', 'text/html');
    res.send(`<ul>${formattedSubjects.join('')}</ul>`);
  } catch (err) {
    console.error('Wystąpił błąd:', err);
    res.status(500).send('Wystąpił błąd podczas przetwarzania zapytania.');
  }
});

router.get('/subjects/:id', async (req, res) => {
  try {
    const results = await query('SELECT * FROM Subjects');
    
    const subject = results.find(subject => subject.idSubjects === parseInt(req.params.id));
    
    res.setHeader('Content-Type', 'text/html');
    subject ? res.send(`<ul><li>{id: ${subject.idSubjects}, name: ${subject.name}, hoursAWeek: ${subject.hoursAWeek}}</li></ul>`) : res.status(404).send('Subject not found');
  } catch (err) {
    console.error('Wystąpił błąd:', err);
    res.status(500).send('Wystąpił błąd podczas przetwarzania zapytania.');
  }
});

app.use('/api', router);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
