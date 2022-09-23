import { MongoClient } from "mongodb";
async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;
    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ meessga: "Invalid Input." });
      return;
    }

    const newMeesage = {
      email,
      name,
      message,
    };
    let client;
    try {
      client = await MongoClient.connect(
        "mongodb+srv://abdelnaby:PACbw2lEpSrPq5jB@cluster0.idf4k.mongodb.net/blog?retryWrites=true&w=majority"
      );
    } catch (error) {
      res.status(500).json({ message: "Could't connect to database." });
      return;
    }
    const db = client.db();
    try {
      const result = await db.collection("messages").insertOne(newMeesage);
      newMeesage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Stroing message failed!" });
      return;
    }
    client.close();
    res.status(201).json({
      message: "Successfully stored message!",
      message: newMeesage,
    });
  }
}
export default handler;
