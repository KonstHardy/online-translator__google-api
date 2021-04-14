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

function showClearBtn() {
  if (document.getElementById("textInput").value.length > 0) {
    document.querySelector(".btn-clear").hidden = false;
  } else {
    document.querySelector(".btn-clear").hidden = true;
  }
}

function clearText() {
  let clearText = "";
  let translatedText = "";

  document.getElementById("textInput").value = clearText;
  document.getElementById("textOutput").value = translatedText;

  showClearBtn();
}

function listen() {
  let textOutput = document.getElementById("textOutput");
  let targetLang = document.getElementById("targetLang");

  let text = textOutput.value;
  let lang = targetLang.value;

  if ("speechSynthesis" in window) {
    let msg = new SpeechSynthesisUtterance();
    let voices = window.speechSynthesis.getVoices();

    if (voices.length > 0) {
      msg.voice = voices.filter(function (voice) {
        return voice.lang == lang;
      })[1];
    }

    msg.voiceURI = "native";
    msg.volume = 1; // 0 to 1;
    msg.rate = 1.5; // 0.1 to 10;
    msg.pitch = 1.5; // 0 to 2;
    msg.text = text;
    msg.lang = lang;

    speechSynthesis.speak(msg);
  }
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
