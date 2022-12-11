let cells = document.querySelectorAll("#field td");
let gamers = ["X", "O"];
start(cells);

function start(cells) {
  let i = 0; // начальное значение счетчика

  for (let cell of cells) {
    cell.addEventListener("click", function step() {
      this.textContent = gamers[i % 2];
      this.removeEventListener("click", step);

      if (isVictory(cells)) {
        alert(this.textContent);
      } else if (i == 8) {
        alert("ничья");
      }

      i++; // увеличиваем счетчик
    });
  }
}

function isVictory(cells) {
  let victoryCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combination of victoryCombinations) {
    if (
      cells[combination[0]].textContent == cells[combination[1]].textContent &&
      cells[combination[1]].textContent == cells[combination[2]].textContent &&
      cells[combination[0]].textContent != ""
    ) {
      return true;
    }
  }

  return false;
}
