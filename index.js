const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//portfolioUser
//uSnbSuDkDjtnHyQH

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  `mongodb+srv://portfolioUser:uSnbSuDkDjtnHyQH@cluster0.0eicqxw.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const projectCollection = client.db("portfolioDB").collection("projects");

    app.get("/projects", async (req, res) => {
      const result = await projectCollection.find().toArray();
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Welcome, Zihan portfolio server");
});
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
