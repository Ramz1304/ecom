//Csv reader
function readcsv() {
  let file = $('#upload');
  Papa.parse(file[0].files[0], {
    download: true,
    header: false,
    delimiter: ",",
    skipEmptyLines: "greedy",
    complete: function(results) {
      let $thead = $('table').find('thead');
      let $tbody = $('table').find('tbody');
      for(let i =0;i<results.data.length;i++){
        if(i === 0){
          for(let j=0;j<results.data[i].length;j++){
            let value = results.data[i][j];
            let cell = $('<th/>').append(value);
            $thead.append(cell);
          }
        }
        else{
          let row = $('<tr/>');
          for(let j=0;j<results.data[i].length;j++){
            let value = results.data[i][j];
            let cell = $('<td/>').append(value);
            row.append(cell);
          }
          $tbody.append(row); 
        }      
      }
    }
  });
}

//Update Name
function updateFileName() {
  let file = $('#upload');
  let fileName = file.val().replace('C:\\fakepath\\', " "); // url check
  $('#uploadname').html(fileName);
}

$(document).ready(

  function () {

    $('#btn-upload').click(readcsv);
    
    $('#upload').on('change', updateFileName)
  }
);