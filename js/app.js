let inputOne = document.querySelector("#input-1");
let inputTwo = document.querySelector("#input-2");
let curencyOne = document.querySelector("#curency-1");
let curencyTwo = document.querySelector("#curency-2");
let clicks;
//
fetch("https://api.frankfurter.app/latest?amount=1&from=USD&to=IDR")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json(); // Parse the response body as JSON
  })
  .then((data) => {
    document.querySelector("#text4").innerHTML = data.date;
    document.querySelector("#text2").innerHTML = data.rates.IDR;
    inputOne.value = "1";
    inputTwo.value = data.rates.IDR;
    curencyOne.value = 1;
    curencyTwo.value = 2;
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });

//
inputOne.addEventListener("input", function () {
  calculating(inputOne.value, inputTwo.value, curencyOne.value, curencyTwo.value);
  clicks = 2;
  preview1();
});
inputTwo.addEventListener("input", function () {
  calculating(inputTwo.value, inputOne.value, curencyTwo.value, curencyOne.value);
  clicks = 1;
  preview1();
});
function calculating(input1, input2, curency1, curency2) {
  if (curency1 == curency2) {
    inputOne.value = 0;
    inputTwo.value = 0;
    alert("Mata uang gaboleh sama");
  }
  if (curency1 == 1) {
    curency1 = "USD";
  } else if (curency1 == 2) {
    curency1 = "IDR";
  } else if (curency1 == 3) {
    curency1 = "EUR";
  }
  if (curency2 == 1) {
    curency2 = "USD";
  } else if (curency2 == 2) {
    curency2 = "IDR";
  } else if (curency2 == 3) {
    curency2 = "EUR";
  }

  let url = `https://api.frankfurter.app/latest?amount=${input1}&from=${curency1}&to=${curency2}`;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parse the response body as JSON
    })
    .then((data) => {
      let hasil;
      if (curency2 == "USD") {
        hasil = data.rates.USD;
      } else if (curency2 == "IDR") {
        hasil = data.rates.IDR;
      } else if (curency2 == "EUR") {
        hasil = data.rates.EUR;
      }
      if (clicks == 2) {
        inputTwo.value = hasil;
      } else if (clicks == 1) {
        inputOne.value = hasil;
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

function preview1() {
  let a = curencyOne.value;
  if (a == 1) {
    a = "USD";
  } else if (a == 2) {
    a = "IDR";
  } else if (a == 3) {
    a = "EUR";
  }
  let b = curencyTwo.value;
  if (b == 1) {
    b = "USD";
  } else if (b == 2) {
    b = "IDR";
  } else if (b == 3) {
    b = "EUR";
  }

  fetch(`https://api.frankfurter.app/latest?amount=1&from=${a}&to=${b}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parse the response body as JSON
    })
    .then((data) => {
      document.querySelector("#text4").innerHTML = data.date;
      if (a == "USD") {
        document.querySelector("#text1").innerHTML = `1 United States Dollar equals`;
      } else if (a == "IDR") {
        document.querySelector("#text1").innerHTML = `1 Indonesian Rupiah equals`;
      } else if (a == "EUR") {
        document.querySelector("#text1").innerHTML = `1 Euro equals`;
      }

      if (b == "USD") {
        document.querySelector("#text2").innerHTML = data.rates.USD;
        document.querySelector("#text3").innerHTML = "United States Dollar";
      } else if (b == "IDR") {
        document.querySelector("#text2").innerHTML = data.rates.IDR;
        document.querySelector("#text3").innerHTML = "Indonesian Rupiah";
      } else if (b == "EUR") {
        document.querySelector("#text2").innerHTML = data.rates.EUR;
        document.querySelector("#text3").innerHTML = "Euro";
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}
