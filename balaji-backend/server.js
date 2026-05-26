const express = require("express");
const cors = require("cors");
const fs = require("fs/promises");
const path = require("path");

const app = express();
const PORT = 5000;

const quotesFilePath = path.join(__dirname, "quotes.json");

app.use(cors());
app.use(express.json());

function validateQuote(body) {
  const requiredFields = ["fullName", "phone", "email", "requirement"];
  for (const field of requiredFields) {
    if (!body[field] || !String(body[field]).trim()) {
      return `Missing required field: ${field}`;
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(String(body.email).trim())) {
    return "Invalid email format";
  }

  return null;
}

async function ensureQuotesFile() {
  try {
    await fs.access(quotesFilePath);
  } catch {
    await fs.writeFile(quotesFilePath, "[]", "utf-8");
  }
}

async function readQuotes() {
  await ensureQuotesFile();
  const raw = await fs.readFile(quotesFilePath, "utf-8");
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeQuotes(quotes) {
  await fs.writeFile(quotesFilePath, JSON.stringify(quotes, null, 2), "utf-8");
}

app.get("/api/quotes", async (req, res) => {
  try {
    const quotes = await readQuotes();
    res.json({ success: true, count: quotes.length, data: quotes });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to read quotes" });
  }
});

app.post("/api/quotes", async (req, res) => {
  try {
    const error = validateQuote(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error });
    }

    const newQuote = {
      fullName: String(req.body.fullName).trim(),
      companyName: req.body.companyName ? String(req.body.companyName).trim() : "",
      phone: String(req.body.phone).trim(),
      email: String(req.body.email).trim(),
      requirement: String(req.body.requirement).trim(),
      timestamp: new Date().toISOString()
    };

    const quotes = await readQuotes();
    quotes.push(newQuote);
    await writeQuotes(quotes);

    res.status(201).json({
      success: true,
      message: "Quote saved successfully",
      data: newQuote
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to save quote" });
  }
});

app.listen(PORT, async () => {
  await ensureQuotesFile();
  console.log(`Balaji backend running on http://localhost:${PORT}`);
});
