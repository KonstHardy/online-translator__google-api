function translation() {
  const API_KEY = "AIzaSyBttL3_rUfMaP8vZQazT8bCd5XhHkmR4lA";
  const baseUrl = "https://translation.googleapis.com/language/translate/v2";

  let requestData = {
    q: document.getElementById("textInput").value,
    target: document.getElementById("targetLang").value,
  };

  sendRequest(
    "POST",
    baseUrl + "?key=" + API_KEY,
    translationResponse,
    JSON.stringify(requestData)
  );
}

function translationResponse() {
  if (successfulRequest(this)) {
    let responseJSON = JSON.parse(this.responseText);
    let translatedText = "";
    responseJSON["data"]["translations"].forEach(function (element) {
      translatedText += element["translatedText"] + "\n";
    });
    document.getElementById("textOutput").value = translatedText;
  }
}

function clearText() {
  console.log("test");
  let clearText = "";
  let translatedText = "";
  document.getElementById("textInput").value = clearText;
  document.getElementById("textOutput").value = translatedText;
}

function sendRequest(method, url, handlerFunction, requestData) {
  let xhttp = new XMLHttpRequest();
  xhttp.open(method, url);
  xhttp.onreadystatechange = handlerFunction;
  if (method == "POST") {
    xhttp.send(requestData);
  } else {
    xhttp.send();
  }
}

function successfulRequest(request) {
  return request.readyState === 4 && request.status == 200;
}
