function translation() {
  let API_KEY = "AIzaSyBttL3_rUfMaP8vZQazT8bCd5XhHkmR4lA";
  let baseUrl = "https://translation.googleapis.com/language/translate/v2";

  var requestData = {
    q: document.getElementById("inputText").value,
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
    var response_json = JSON.parse(this.responseText);
    var translated_text = "";
    response_json["data"]["translations"].forEach(function (element) {
      translated_text += element["translatedText"] + "\n";
    });
    document.getElementById("outputText").value = translated_text;
  }
}

function sendRequest(method, url, handlerFunction, requestData) {
  var xhttp = new XMLHttpRequest();
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
