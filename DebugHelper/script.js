function highlightKeyword() {
  var keyword = document.getElementById("keywordInput").value;
  var fileInput = document.getElementById("fileInput");
  var contentDiv = document.getElementById("content");

  if (fileInput.files.length === 0) {
    alert("Please select a file.");
    return;
  }

  var file = fileInput.files[0];
  var reader = new FileReader();

  reader.onload = function (e) {
    var lines = e.target.result.split("\n");
    contentDiv.innerHTML = "";

    for (var i = 0; i < lines.length; i++) {
      if (lines[i].includes(keyword)) {
        contentDiv.innerHTML +=
          '<span class="highlight">' + lines[i] + "</span><br>";
      } else {
        contentDiv.innerHTML += lines[i] + "<br>";
      }
    }
  };

  reader.readAsText(file);
}

function addKeywordColorPair() {
  const keywordColorPairs = document.getElementById("keywordColorPairs");

  const keywordInput = document.createElement("input");
  keywordInput.type = "text";
  keywordInput.className = "keywordInput";
  keywordInput.placeholder = "Enter keyword";

  const colorSelect = document.createElement("select");
  colorSelect.className = "colorSelect";
  ["Red", "Blue", "Green"].forEach((color) => {
    let colorOption = document.createElement("option");
    colorOption.value = color.toLowerCase();
    colorOption.textContent = color;
    colorSelect.append(colorOption);
  });

  keywordColorPairs.append(keywordInput);
  keywordColorPairs.append(colorSelect);
  keywordColorPairs.append(document.createElement("br"));
}
