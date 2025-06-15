var prijava_ime = document.getElementById("log_ime");
var prijava_sifra = document.getElementById("log_sifra");

var reg_ime = document.getElementById("reg_ime");
var reg_sifra = document.getElementById("reg_sifra");
var reg_sifra_ponovo = document.getElementById("reg_sifra_potvrda");

//botuni
var btnLogin = document.getElementById("btnLogin");
var btnReg = document.getElementById("btnReg");

btnReg.addEventListener("click", (event) => {
  event.preventDefault();

  if (reg_ime.value.length < 3) {
    alert("Duljina imena mora biti barem 3 znaka!");
    return;
  }
  if (reg_sifra.value.length < 8) {
    alert("Zaporka mora imati barem 8 znakova!");
    return;
  }
  if (reg_sifra.value != reg_sifra_ponovo.value) {
    alert("Zaporke se ne podudaraju");
    return;
  }

  const DataToPost = {
    korisnickoIme: reg_ime.value,
    lozinka: reg_sifra.value,
  };

  fetch("http://localhost:4001/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(DataToPost),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw new Error(data.poruka || "Greška pri registraciji.");
        });
      }
      return response.json();
    })
    .then((data) => {
      alert(data.poruka || "Registracija uspješna!");
    })
    .catch((error) => {
      alert(error.message || "Došlo je do greške pri registraciji.");
      console.error(error);
    });
});

btnLogin.addEventListener("click", (event) => {
  event.preventDefault();

  if (prijava_ime.value.trim() === "" || prijava_sifra.value.trim() === "") {
    alert("Molimo unesite korisničko ime i lozinku.");
    return;
  }

  const loginData = {
    korisnickoIme: prijava_ime.value,
    lozinka: prijava_sifra.value,
  };

  fetch("http://localhost:4001/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw new Error(data.poruka || "Greška pri prijavi");
        });
      }
      return response.json();
    })
    .then((data) => {
      alert(data.poruka || "Uspješna prijava!");
      window.location.href = "home.html";
    })
    .catch((error) => {
      alert(error.message || "Došlo je do greške pri prijavi.");
      console.error(error);
    });
});
