import Note from "../models/Note.js";
export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error in get all notes");
    res.status(500).json({ message: "server error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "note not found" });
    res.status(200).json(note);
  } catch (error) {
    console.log("Error in get note by id");
    res.status(500).json({ message: "server error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, description } = req.body;
    const note = new Note({ title, description });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.log("Error in create note");
    res.status(500).json({ message: "server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, description } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );
    if (!updatedNote)
      return res.status(404).json({ message: "note not found" });
    res.status(200).json({ message: "you updated a note" });
  } catch (error) {
    console.log("Error in update note");
    res.status(500).json({ message: "server error" });
  }
}

export function deleteNote(req, res) {
  try {
    Note.findByIdAndDelete(req.params.id)
      .then((note) => {
        if (!note) return res.status(404).json({ message: "note not found" });
        res.status(200).json({ message: "you deleted a note" });
      })
      .catch((error) => {
        console.log("Error in delete note");
        res.status(500).json({ message: "server error" });
      });
  } catch (error) {}
}
