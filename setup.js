const fs = require("fs");
const path = require("path");

function write(filePath, content) {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, "utf-8");
  console.log("✅", filePath);
}

const files = {
  "client/index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Crypto Lottery</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`,

  "client/package.json": `{
  "name": "vip-lottery-dapp",
  "private": true,
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "ethers": "^6.8.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.24",
    "tailwindcss": "^3.4.1",
    "vite": "^5.0.0"
  }
}`,

  "client/tailwind.config.js": `export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};`,

  "client/postcss.config.cjs": `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`,

  "client/src/index.css": `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white;
}`,

  "client/src/main.jsx": `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,

  "client/src/App.jsx": `import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </Router>
);

export default App;`,

  "client/src/pages/Home.jsx": `import Layout from "../components/Layout";

const Home = () => (
  <Layout>
    <section className="text-center py-24">
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-400 animate-pulse">
        🚀 ברוך הבא להגרלת הקריפטו
      </h1>
      <p className="mt-4 text-lg text-gray-400">קנה כרטיס ואולי תזכה בפרס חיים</p>
      <button className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full font-bold text-white shadow-md">
        הצטרף עכשיו
      </button>
    </section>
  </Layout>
);

export default Home;`,

  "client/src/components/Layout.jsx": `import NavBar from "./NavBar";

const Layout = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white">
    <NavBar />
    <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
  </div>
);

export default Layout;`,

  "client/src/components/NavBar.jsx": `import { Link } from "react-router-dom";

const NavBar = () => (
  <nav className="sticky top-0 z-50 bg-black/70 backdrop-blur-md shadow-lg border-b border-purple-800">
    <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-purple-400">💎 Crypto Lottery</h1>
      <div className="flex space-x-6 items-center text-sm font-medium">
        <Link to="/" className="hover:text-purple-300">🏠 בית</Link>
        <Link to="/lottery/1" className="hover:text-purple-300">🎟️ הגרלה</Link>
        <button className="bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-2 rounded text-black font-bold shadow-lg hover:from-pink-500 hover:to-purple-700 transition">
          התחבר לארנק
        </button>
      </div>
    </div>
  </nav>
);

export default NavBar;`,

  "client/src/web3/wallet.js": `import { ethers } from "ethers";

export async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask לא מותקן");
    return null;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const accounts = await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  return { provider, signer, address: accounts[0] };
}`,

  "client/src/theme/theme.js": `export const theme = {
  colors: {
    background: "bg-gradient-to-b from-gray-900 via-black to-gray-800",
    primary: "text-purple-400",
    glowBtn: "bg-gradient-to-r from-purple-500 to-indigo-600",
    glowHover: "hover:from-pink-500 hover:to-purple-700",
    border: "border border-purple-700",
    cardBg: "bg-gradient-to-br from-gray-800 to-gray-900"
  },
  fonts: {
    heading: "text-4xl md:text-5xl font-extrabold"
  }
};`,

  "contracts/LotteryContract.sol": `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract LotteryContract {
    struct Lottery {
        uint256 id;
        string title;
        uint256 ticketPrice;
        uint256 maxTickets;
        address[] participants;
        bool isActive;
    }

    mapping(uint256 => Lottery) public lotteries;
    uint256 public nextLotteryId;

    event TicketPurchased(uint256 lotteryId, address buyer);
    event LotteryEnded(uint256 lotteryId, address winner);

    function createLottery(string memory _title, uint256 _ticketPrice, uint256 _maxTickets) public {
        Lottery storage newLottery = lotteries[nextLotteryId];
        newLottery.id = nextLotteryId;
        newLottery.title = _title;
        newLottery.ticketPrice = _ticketPrice;
        newLottery.maxTickets = _maxTickets;
        newLottery.isActive = true;
        nextLotteryId++;
    }

    function buyTicket(uint256 _lotteryId) public payable {
        Lottery storage lottery = lotteries[_lotteryId];
        require(lottery.isActive, "Lottery is not active");
        require(msg.value == lottery.ticketPrice, "Incorrect ticket price");
        require(lottery.participants.length < lottery.maxTickets, "All tickets sold");
        lottery.participants.push(msg.sender);
        emit TicketPurchased(_lotteryId, msg.sender);
    }

    function endLottery(uint256 _lotteryId) public {
        Lottery storage lottery = lotteries[_lotteryId];
        require(lottery.isActive, "Lottery already ended");
        lottery.isActive = false;

        if (lottery.participants.length > 0) {
            uint256 winnerIndex = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao))) % lottery.participants.length;
            address winner = lottery.participants[winnerIndex];
            payable(winner).transfer(address(this).balance);
            emit LotteryEnded(_lotteryId, winner);
        }
    }

    function getParticipants(uint256 _lotteryId) public view returns (address[] memory) {
        return lotteries[_lotteryId].participants;
    }
}`,

  "scripts/deploy.js": `const hre = require("hardhat");

async function main() {
  const Lottery = await hre.ethers.getContractFactory("LotteryContract");
  const contract = await Lottery.deploy();
  await contract.waitForDeployment();
  console.log("✅ Contract deployed at:", contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});`,

  "backend/index.js": `const express = require("express");
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
});`
};

// יצירת כל הקבצים בפועל
Object.entries(files).forEach(([file, content]) => write(file, content));
