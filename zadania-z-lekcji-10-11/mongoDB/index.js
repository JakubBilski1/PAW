const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const fs = require('fs/promises');
const { MongoClient } = require('mongodb');
const port = 3000
const uri = process.env.MONGO_URI

app.set('json spaces', 2);

const connect = async() =>{
  const db = await MongoClient.connect(uri);
  return db;
}

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
  try{
    const db = await connect();
    await db.db('School').collection('Contact').insertOne({
      name: name,
      email: email,
      topic: select,
      message: textarea
    });
  }catch(err){
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
  try{
    const db = await connect();
    const students = await db.db('School').collection('Students').find().toArray();
    const formattedStudents = JSON.stringify(students, null, 2);
    res.set('Content-Type', 'application/json');
    res.send(formattedStudents);
  }catch(err){
    console.error('Wystąpił błąd:', err);
    res.status(500).send('Wystąpił błąd podczas przetwarzania zapytania.');
  }
});

router.get('/students/:id', async (req, res) => {
  try{
    const db = await connect();
    const students = await db.db('School').collection('Students').find().toArray();
    const student = students.find(student => student.id === parseInt(req.params.id));
    const formattedStudents = JSON.stringify(student, null, 2);
    res.set('Content-Type', 'application/json');
    res.send(formattedStudents);
  }catch(err){
    console.error('Wystąpił błąd:', err);
    res.status(500).send('Wystąpił błąd podczas przetwarzania zapytania.');
  }
});

router.get('/subjects', async (req, res) => {
  try{
    const db = await connect();
    const subjects = await db.db('School').collection('Subjects').find().toArray();
    const formattedSubjects = JSON.stringify(subjects, null, 2);
    res.set('Content-Type', 'application/json');
    res.send(formattedSubjects);
  }catch(err){
    console.error('Wystąpił błąd:', err);
    res.status(500).send('Wystąpił błąd podczas przetwarzania zapytania.');
  }
});

router.get('/subjects/:id', async (req, res) => {
  try{
    const db = await connect();
    const subjects = await db.db('School').collection('Subjects').find().toArray();
    const subject = subjects.find(subject => subject.id === parseInt(req.params.id));
    const formattedSubjects = JSON.stringify(subject, null, 2);
    res.set('Content-Type', 'application/json');
    res.send(formattedSubjects);
  }catch(err){
    console.error('Wystąpił błąd:', err);
    res.status(500).send('Wystąpił błąd podczas przetwarzania zapytania.');
  }
});

app.use('/api', router);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
