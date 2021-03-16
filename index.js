const express = require('express');
const ejs = require('ejs');
const app = express();
const connection = require('./database/database');
const questionModel = require('./database/models/question');
const answerModel = require('./database/models/answer');
const dateFns = require('date-fns');
const pt = require('date-fns/locale/pt');
const question = require('./database/models/question');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    questionModel.findAll({
        raw: true, order: [
            ['id', 'DESC']
        ]
    }).then(questions => {
        res.render('index', {
            questions,
            dateFns,
            pt
        });
    });
});

app.get('/perguntar', (req, res) => {
    res.render('ask');
});

app.post('/perguntar', (req, res) => {
    questionModel.create({
        titulo: req.body.titulo,
        descricao: req.body.descricao
    }).then(() => {
        res.redirect('/');
    });
});

app.get('/pergunta/:id', (req, res) => {
    const id = req.params.id;
    questionModel.findOne({
        where: { id: id }
    }).then(questions => {
        if (questions != undefined) {
            answerModel.findAll({
                where: { question_id: id },
                order:  [ ['id', 'DESC'] ]
            }).then((answers) => {
                res.render('asks', {
                    questions,
                    answers
                });
            });
        } else {
            res.redirect('/')
        }
    });
});

app.post('/answer', (req, res) => {
    const text = req.body.text;
    const questionId = req.body.question;
    answerModel.create({
        text: text,
        question_id: questionId
    }).then(() => {
        res.redirect('/pergunta/'+questionId)
    })
});

app.listen(3000, () => {
    console.log("Servidor rodando!")
});