import express from 'express';
import connectDB from './config/db.js';
import NoteModel from './models/note.js';

connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Welcome Page</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: Arial, sans-serif;
                background: linear-gradient(135deg, #667eea, #764ba2);
            }

            .container {
                text-align: center;
                background: white;
                padding: 50px;
                border-radius: 20px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            }

            h1 {
                color: #764ba2;
                font-size: 40px;
            }

            p {
                color: #555;
                font-size: 18px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1> Welcome to My Creative Space! </h1>
            <p>Innovate • Explore • Create • Inspire</p>
            <p>Your journey of amazing ideas starts here!</p>
        </div>
    </body>
    </html>
    `);
});

app.post('/create', async (req, res) => {

    const body = req.body;
    const data = await NoteModel(body).save();
    res.status(201).json("message:Note created successfully.....");
})

app.get("/allNotes", async (req, res) => {

    const allNotes = await NoteModel.find();
    res.status(200).json({
        "status":"true",
        "message":"All notes list.....",
        "data":allNotes
    });
})

app.get("/note/:id", async (req, res) => {

    const noteId = req.params.id;
    const note = await NoteModel.findById(noteId);
    res.status(200).json({
        "message":"Find one notes",
        "data":note
    })
})

app.delete("/note/:id",async(req, res) => {

    const noteId = req.params.id;

    const note = await NoteModel.findByIdAndDelete(noteId);


    res.status(404).json({
        "message":"Note deleted successfully.....",
        "data":note
    })
})

app.put("/note/:id",async(req, res) => {

    const noteId = req.params.id;
    const body = req.body;

    const updateNote = await NoteModel.findByIdAndUpdate(noteId,body);


    res.json({
        "message":"Note updated successfully.....",
        "data":updateNote
    })
})

export default app;
