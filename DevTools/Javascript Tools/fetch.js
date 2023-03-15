
fetch("./file_one.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.getElementById('file_one').innerHTML = data;
  });

fetch("./file_two.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.getElementById('file_two').innerHTML = data;
  });