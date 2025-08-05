import mangoose from "mongoose";

const noteSchema = new mangoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Note = mangoose.model("Note", noteSchema);
export default Note;
