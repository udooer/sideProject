function highlightKeyword() {
    var keyword = document.getElementById('keywordInput').value;
    var fileInput = document.getElementById('fileInput');
    var contentDiv = document.getElementById('content');

    if (fileInput.files.length === 0) {
        alert('Please select a file.');
        return;
    }

    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
        var lines = e.target.result.split('\n');
        contentDiv.innerHTML = '';

        for (var i = 0; i < lines.length; i++) {
            if (lines[i].includes(keyword)) {
                contentDiv.innerHTML += '<span class="highlight">' + lines[i] + '</span><br>';
            } else {
                contentDiv.innerHTML += lines[i] + '<br>';
            }
        }
    };

    reader.readAsText(file);
}