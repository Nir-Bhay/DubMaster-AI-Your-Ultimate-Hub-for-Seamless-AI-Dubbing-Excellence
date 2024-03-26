// Selecting all required elements
const dropArea = document.querySelector(".drag-area"),
    dragText = dropArea.querySelector("header"),
    button = dropArea.querySelector("button"),
    input = dropArea.querySelector("input");
let file; // This is a global variable and we'll use it inside multiple functions

button.onclick = () => {
    input.click(); // If the user clicks on the button, then the input is also clicked
}

input.addEventListener("change", function () {
    // Getting the user-selected file and [0] means if the user selects multiple files, we'll select only the first one
    file = this.files[0];
    dropArea.classList.add("active");
    showFile(); // Calling the function
});

// If the user drags a file over DropArea
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault(); // Preventing the default behavior
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload File";
});

// If the user leaves the dragged file from DropArea
dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
});

// If the user drops a file on DropArea
dropArea.addEventListener("drop", (event) => {
    event.preventDefault(); // Preventing the default behavior
    // Getting the user-selected file and [0] means if the user selects multiple files, we'll select only the first one
    file = event.dataTransfer.files[0];
    showFile(); // Calling the function
});

function showFile() {
    let fileType = file.type; // Getting the selected file type
    let validExtensions = ["video/mp4", "video/mkv"]; // Adding valid video extensions in the array
    if (validExtensions.includes(fileType) && file.size < 50 * 1024 * 1024) { // If the user-selected file is a video file and less than 50MB
        let fileReader = new FileReader(); // Creating a new FileReader object
        fileReader.onload = () => {
            let fileURL = fileReader.result; // Passing the user file source into the fileURL variable
            let videoTag = `<video width="100%" height="100%" controls><source src="${fileURL}" type="${fileType}"></video>`; // Creating a video tag and passing the user-selected file source inside the source attribute
            dropArea.innerHTML = videoTag; // Adding the created video tag inside the dropArea container
        }
        fileReader.readAsDataURL(file);
    } else {
        alert("Please upload a valid video file (less than 50MB)!");
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to Upload File";
    }
}
