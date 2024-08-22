import express from 'express';
import cors from 'cors';
import { DB_URL, PORT } from './config.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
const router = express.Router();

app.use(express.json());
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:5000/',
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    credentials: true,
}));

mongoose.connect(DB_URL)
    .then(() => {
        console.log("Connected Successfully");
    })
    .catch((err) => {
        console.log("Not Connected ", err);
    })


const passwordSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    site: {
        type: String,
        required: false,
        default: 'www.xyz.com'
    },
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true
    },
    isFavorite: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        required: false,
        enum: ['Logins', 'OtherTypes']
    },
    category: {
        type: String,
        required: false,
    },
    lastModified: {
        type: Date,
        default: Date.now
    },
    logo: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/5339/5339184.png"
    }
});

const Password = mongoose.model('Password', passwordSchema)

app.route('/')
    .get(async (req, res) => {
        await Password.find({})
            .then((result) => {
                return res.send(result)
            })
    })
    .post(async (req, res) => {
        console.log(req.body);
        const passwordItem = new Password(req.body)
        await passwordItem.save()
            .then((result) => {
                console.log(result);
                return res.send(result)
            })
            .catch((err) => {
                console.log(err);
            })
    })
    .post()

app.route('/delete/:id')
    .delete(async (req, res) => {
        const id = req.params.id;
        Password.findByIdAndDelete(id)
            .then((result) => {
                console.log(result);
                return res.send(result)
            })
            .catch((err) => {
                console.log(err);
                return err;
            });
    })
app.route('/:id')
    .put(async (req, res) => {
        const id = req.params.id;
        const updatedData = req.body;
        console.log(updatedData);
        Password.findByIdAndUpdate(
            id,
            updatedData, { new: true, runValidators: true }
        )
            .then((result) => {
                console.log(result);
                return res.send(result)
            })
            .catch((err) => {
                console.log(err);
                return err
            });
    })

app.listen(PORT, () => {
    console.log("Server is Listening at " + PORT);
})


