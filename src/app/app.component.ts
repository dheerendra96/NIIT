import { Component, HostListener } from '@angular/core';
// import { setInterval } from 'timers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  marioCurrentRow = 0;
  marioCurrentCol = 0;
  record = [];
  step = 0;

  public row;
  public food;
  public column;

  public left;
  public right;
  public up;
  public down;

  constructor() {
    this.row = prompt("Enter the no. of row");
    this.food = this.row;
    this.column = prompt("Enter the no. of column");
    this.setFood(this.row, this.column);
  }

  ngOnInit(): void { }


  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(e) {

    switch (e.keyCode) {
      case 37:
        this.moveLeft();
        break;

      case 38:
        this.moveUp();
        break;

      case 39:
        this.moveRight();
        break;

      case 40:
        this.moveDown();
        break;

      default:
        break;
    }
  }


  moveDown() {
    this.clearAllInterval();
    this.down = setInterval(() => {
      if (this.marioCurrentRow < this.row - 1) {
        this.record[this.marioCurrentRow].rowArray[this.marioCurrentCol].marioPresence = false;
        if (this.record[this.marioCurrentRow + 1].rowArray[this.marioCurrentCol].foodPresence) {
          this.record[this.marioCurrentRow + 1].rowArray[this.marioCurrentCol].foodPresence = false;
          this.food--;
        }
        this.record[this.marioCurrentRow + 1].rowArray[this.marioCurrentCol].marioPresence = true;
        this.marioCurrentRow++;
        this.step++;
        this.checkfoodCount();
      }
      if (this.marioCurrentRow === this.row - 1) {
        this.moveUp();

      }
    }, 500);
  }


  moveUp() {
    this.clearAllInterval();
    this.up = setInterval(() => {
      if (this.marioCurrentRow > 0) {
        this.record[this.marioCurrentRow].rowArray[this.marioCurrentCol].marioPresence = false;
        if (this.record[this.marioCurrentRow - 1].rowArray[this.marioCurrentCol].foodPresence) {
          this.food--;
          this.record[this.marioCurrentRow - 1].rowArray[this.marioCurrentCol].foodPresence = false;
        }
        this.record[this.marioCurrentRow - 1].rowArray[this.marioCurrentCol].marioPresence = true;
        this.marioCurrentRow--;
        this.step++;
        this.checkfoodCount();
      }
      if (this.marioCurrentRow === 0) {
        this.moveDown();
      }
    }, 500);
  }

  moveRight() {
    this.clearAllInterval();
    this.right = setInterval(() => {
      if (this.marioCurrentCol + 1 < this.column) {
        this.record[this.marioCurrentRow].rowArray[this.marioCurrentCol].marioPresence = false;
        if (this.record[this.marioCurrentRow].rowArray[this.marioCurrentCol + 1].foodPresence) {
          this.food--;
          this.record[this.marioCurrentRow].rowArray[this.marioCurrentCol + 1].foodPresence = false;
        }
        this.record[this.marioCurrentRow].rowArray[this.marioCurrentCol + 1].marioPresence = true;
        this.marioCurrentCol++;
        this.step++;
        this.checkfoodCount();
      }
      if (this.marioCurrentCol === this.column - 1) {
        this.moveLeft();
      }
    }, 500);

  }
  moveLeft() {
    this.clearAllInterval();
    this.left = setInterval(() => {
      if (this.marioCurrentCol > 0) {
        this.record[this.marioCurrentRow].rowArray[this.marioCurrentCol].marioPresence = false;
        if (this.record[this.marioCurrentRow].rowArray[this.marioCurrentCol - 1].foodPresence) {
          this.food--;
          this.record[this.marioCurrentRow].rowArray[this.marioCurrentCol - 1].foodPresence = false;
        }
        this.record[this.marioCurrentRow].rowArray[this.marioCurrentCol - 1].marioPresence = true;
        this.marioCurrentCol--;
        this.step++;
        this.checkfoodCount();
      }
      if (this.marioCurrentCol === 0) {
        this.moveRight();
      }
    }, 500);

  }

  clearAllInterval() {
    clearInterval(this.up);
    clearInterval(this.down);
    clearInterval(this.left);
    clearInterval(this.right);

  }
  checkfoodCount() {
    if (this.food === 0) {
      this.clearAllInterval();
      // alert(`you won the game in ${this.step}`);
    }
  }


  setFood(row, column) {
    for (let i = 0; i < row; i++) {
      const rowData = {
        rowId: i,
        rowArray: []
      }

      for (let j = 0; j < column; j++) {
        const colData = {
          colId: j,
          foodPresence: false,
          marioPresence: j === 0 && i === 0 ? true : false
        }
        rowData.rowArray.push(colData);

      }
      this.record.push(rowData);
      let foodPosition;
      if (i === 0) {
        foodPosition = Math.floor(Math.random() * (column - 1)) + 1;
      } else {
        foodPosition = Math.floor(Math.random() * (column - 0)) + 0;
      }
      this.record[i].rowArray[foodPosition].foodPresence = true;
    }
  }

}
