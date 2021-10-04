import dbConnect from "../../../utils/dbConnect";
import Note from "../../../models/Note";

dbConnect();

export default async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const notes = await Note.findById(id);
        if (!notes) {
          return res.status(400).json({ sucess: false });
        }
        res.status(200).json({ sucess: true, data: notes });
      } catch (error) {
        res.status(400).json({ sucess: false });
      }
      break;
    case "PUT":
      try {
        const notes = await Note.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!notes) {
          return res.status(400).json({ sucess: false });
        }
        res.status(200).json({ sucess: true, data: notes });
      } catch (error) {
        res.status(400).json({ sucess: false });
      }
      break;

    case "DELETE":
      try {
        const deletednotes = await Note.deleteOne({ _id: id });
        if (!deletednotes) {
          return res.status(400).json({ sucess: false });
        }
        res.status(200).json({ sucess: true, data: {} });
      } catch (error) {
        res.status(400).json({ sucess: false });
      }
      break;

    default:
      res.status(400).json({ sucess: false });
      break;
  }
};
