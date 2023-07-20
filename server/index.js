const connectToMongo=require('./db');
connectToMongo();
const express = require('express')
const app = express()
const port = 80

var cors=require("cors");
app.use(cors());
app.use(express.json());
app.use("/api/create",require("./routes/Create"));
app.use("/api/transactions",require("./routes/transactions"));
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Bank app listening on port at http://localhost:${port}`)
})