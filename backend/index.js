const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/lotteryDB");

const ticketSchema = new mongoose.Schema({
  address: String,
  ticketId: String,
  lotteryId: Number,
  purchaseDate: Date,
  status: String,
});

const Ticket = mongoose.model("Ticket", ticketSchema);

app.post("/api/ticket", async (req, res) => {
  const newTicket = new Ticket(req.body);
  await newTicket.save();
  res.status(201).send(newTicket);
});

app.get("/api/tickets/:address", async (req, res) => {
  const tickets = await Ticket.find({ address: req.params.address });
  res.send(tickets);
});

app.listen(5000, () => {
  console.log("✅ Backend running at http://localhost:5000");
});