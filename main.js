function translation() {
  let key = "AIzaSyBttL3_rUfMaP8vZQazT8bCd5XhHkmR4lA";
  let url = "https://translation.googleapis.com/language/translate/v2";

  var content = {
    q: document.getElementById("lang__from").value,
    target: document.getElementById("lang__to").value,
  };

  // console.log("test");

  ajaxRequest(
    "POST",
    url + "?key=" + key,
    translationResponse,
    JSON.stringify(content)
  );
}

function translationResponse() {
  if (successfulRequest(this)) {
    var response_json = JSON.parse(this.responseText);
    var translated_text = "";
    response_json["data"]["translations"].forEach(function (element) {
      translated_text += element["translatedText"] + "\n";
    });
    document.getElementById("translated").value = translated_text;
  }
}

function ajaxRequest(method, url, handlerFunction, content) {
  var xhttp = new XMLHttpRequest();
  xhttp.open(method, url);
  xhttp.onreadystatechange = handlerFunction;
  if (method == "POST") {
    xhttp.send(content);
  } else {
    xhttp.send();
  }
}

function successfulRequest(request) {
  return request.readyState === 4 && request.status == 200;
}
