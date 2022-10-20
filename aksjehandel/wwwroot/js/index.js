﻿fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d')
  .then((response) => response.json())
  .then((data) => console.log(data));

window.onload = function () {
    hentAlleKunder();
}

function hentAlleKunder() {
    $.get("aksje/hentAlle", function (aksjer) {
        formaterAksjer(aksjer);
    });
}

function formaterAksjer(aksjer) {
    let ut = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>Navn</th><th>Pris</th><th>Stock</th><th></th><th></th>" +
        "</tr>";
    for (let aksje of aksjer) {
        ut += "<tr>" + 
            "<td>" + aksje.aksjenavn + "</td>" +
            "<td>" + aksje.pris + "</td>" +
            "<td>" + aksje.stock + "</td>" +
            "<td> <a class='btn btn-primary' href='endre.html?id=" + aksje.id+"'>Endre</a></td>"+
            "<td> <button class='btn btn-danger' onclick='slettKunde(" + aksje.id+")'>Slett</button></td>"+
            "</tr>";
    }
    ut += "</table>";
    $("#kundene").html(ut);
}

function slettKunde(id) {
    const url = "Kunde/Slett?id="+id;
    $.get(url, function (OK) {
        if (OK) {
            window.location.href = 'index.html';
        }
        else {
            $("#feil").html("Feil i db - prøv igjen senere");
        }

    });
};