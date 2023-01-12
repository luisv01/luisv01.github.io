function renderBoston(boston, earnerCount) {
  // const len = boston.length; // boston is an array
  var person = boston.data;
  var len = boston.data.length;
  var html = '';
  let countOver100k = 0;

  for (let i = 0; i < len; i++) {
    if (parseFloat(person[i][18]) > 100000) {
      countOver100k++;
    }
  }

  html =
    '<h2>' +
    'Number of people working for Boston earning over $100,000 is: ' +
    countOver100k +
    '.' +
    '</h2>';

  earnerCount.innerHTML = html;
}

function hiSort(list) {
  list.sort(function (a, b) {
    return b[1] - a[1];
  });
}

function lowSort(list) {
  list.sort(function (a, b) {
    return a[1] - b[1];
  });
}

function renderSalaries(sort) {
  var person = boston.data;
  var len = boston.data.length;
  var names = '';
  let salaries = [];

  // finding the highest salaries and their names and adding them in descending order in 2D array.
  for (let i = 0; i < len; i++) {
    salaries.push([person[i][8], parseFloat(person[i][11])]);
  }

  sort(salaries);

  for (let i = 0; i < 5; i++) {
    names += `<tr>
                  <td>${salaries[i][0]}</td>
                  <td>${salaries[i][1]}</td>
                </tr>`;
  }
  tableHead.innerHTML = `<tr>
  <th scope="col">Name</th>
  <th scope="col">Total Earned</th>
</tr>`;
  earnerList.innerHTML = names;
}

const cont = document.getElementById('earnerCount');
const cont2 = document.getElementById('earnerList');
const tableHead = document.getElementById('tableHead');
const btn = document.getElementById('btn');
const btn2 = document.getElementById('btn2');

btn.addEventListener('click', function handleClick() {
  renderSalaries(hiSort);
});

btn2.addEventListener('click', function handleClick() {
  renderSalaries(lowSort);
});

renderBoston(boston, cont);
