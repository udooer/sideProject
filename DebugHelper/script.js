function highlightKeyword() {
    const keywordInputs = document.getElementsByClassName("keywordInput");
    const colorSelects = document.getElementsByClassName("colorSelect");
    const fileInput = document.getElementById("fileInput");
    const contentDiv = document.getElementById("content");

    if (fileInput.files.length === 0) {
        alert("Please select a file.");
        return;
    }

    let isContainKeyWord = false;
    for (var i = keywordInputs.length - 1; i > -1; i--) {
        if (keywordInputs[i].value != "") {
            isContainKeyWord = true;
        }
        else {
            keywordInputs[i].remove()
            colorSelects[i].remove()
        }
    }
    if (!isContainKeyWord) {
        alert("Please input keyword");
        return;
    }

    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
        var lines = e.target.result.split("\n");
        contentDiv.innerHTML = "";

        for (var i = 0; i < lines.length; i++) {
            let hasHighlighted = false;
            for (var j = 0; j < keywordInputs.length; j++) {
                if (lines[i].includes(keywordInputs[j].value)) {
                    contentDiv.innerHTML +=
                        '<span style="color:' + colorSelects[j].value + '">' + lines[i] + "</span><br>";
                    hasHighlighted = true;
                    break;
                }
            }
            if (!hasHighlighted) {
                contentDiv.innerHTML += lines[i] + "<br>";
            }

        }
    };

    reader.readAsText(file);
}

function addKeywordColorPair() {
    addKeywordColorElement("", "Red");
}

function addKeywordColorElement(input, highlightColor){
    const keywordColorPairs = document.getElementById("keywordColorPairs");

    const keywordInput = document.createElement("input");
    keywordInput.type = "text";
    keywordInput.className = "keywordInput";
    keywordInput.placeholder = "Enter keyword";
    keywordInput.value = input;

    const colorSelect = document.createElement("select");
    colorSelect.className = "colorSelect";
    ["Red", "Blue", "Green"].forEach((color) => {
        const colorOption = document.createElement("option");
        colorOption.value = color.toLowerCase();
        colorOption.textContent = color;
        colorOption.selected = highlightColor.toLowerCase() == color.toLowerCase();
        colorSelect.append(colorOption);
    });

    keywordColorPairs.append(keywordInput);
    keywordColorPairs.append(colorSelect);
    keywordColorPairs.append(document.createElement("br"));
}

function importJSONKeyword(){
    const jsonFile = document.getElementById("jsonFile");

    if(jsonFile.files.length == 0){
        alert("Please select a JSON file");
        return;
    }

    const file = jsonFile.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const jsonContent = e.target.result;
        const keywordColorPairs = JSON.parse(jsonContent);

        const container = document.getElementById("keywordColorPairs");
        for(const pair of keywordColorPairs){
            addKeywordColorElement(pair.keyword, pair.color);
        }
    };

    reader.readAsText(file);
}
