import express from 'express';
import connectDB from './config/db.js';
import NoteModel from './models/note.js';

connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hiiii');
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
