const express = require("express");
const app = express();

// CORS middleware — mora biti na vrhu
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5500");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Omogućujemo Expressu da čita JSON body
app.use(express.json());

// Baza korisnika u memoriji
let korisnici = [{ id: 1, korisnickoIme: "admin", lozinka: "admin123" }];

// REGISTRACIJA
app.post("/register", (req, res) => {
  const { korisnickoIme, lozinka } = req.body;

  if (!korisnickoIme || !lozinka) {
    return res
      .status(400)
      .json({ poruka: "Unesite korisničko ime i lozinku." });
  }

  const postoji = korisnici.find((k) => k.korisnickoIme === korisnickoIme);
  if (postoji) {
    return res.status(409).json({ poruka: "Korisničko ime je zauzeto." });
  }

  const noviKorisnik = {
    id: korisnici.length + 1,
    korisnickoIme,
    lozinka,
  };
  korisnici.push(noviKorisnik);
  console.log("Registriran korisnik:", noviKorisnik);
  res.status(201).json({ poruka: "Uspješna registracija!" });
});

// LOGIN
app.post("/login", (req, res) => {
  const { korisnickoIme, lozinka } = req.body;

  const korisnik = korisnici.find(
    (k) => k.korisnickoIme === korisnickoIme && k.lozinka === lozinka
  );

  if (!korisnik) {
    return res
      .status(401)
      .json({ poruka: "Neispravno korisničko ime ili lozinka." });
  }

  res.json({ poruka: "Uspješna prijava!", korisnikId: korisnik.id });
});

// Pokreni server
const PORT = 4001;
app.listen(PORT, () => {
  console.log(`✅ Server pokrenut na http://localhost:${PORT}`);
});
