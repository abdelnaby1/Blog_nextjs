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
    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clusterName}.idf4k.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
    try {
      client = await MongoClient.connect(connectionString);
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
