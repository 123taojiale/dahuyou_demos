<template>
  <h1>五子棋小游戏</h1>
  <h2>{{ player === "white" ? "白" : "黑" }}方回合</h2>
  <h2>坐标：{{ position }}</h2>
  <button @click="init">重新开始</button>
  <div class="gobang-container">
    <template v-for="row in boardSize.row">
      <template v-for="col in boardSize.col">
        <span
          class="chess"
          :class="chessTypeMap[chessboard[row - 1][col - 1]]"
          @click="play(row - 1, col - 1)"
          @mouseenter="position = `(${row - 1}, ${col - 1})`"
        ></span>
      </template>
    </template>
  </div>
</template>

<script>
// 棋子类型
const chessTypeMap = {
  non: 0,
  black: 1,
  white: 2,
  0: "non",
  1: "black",
  2: "white",
};

// 棋盘尺寸
const boardSize = {
  col: 20,
  row: 20,
};

// 棋盘
const chessboard = new Array(boardSize.row)
  .fill(0)
  .map(() => new Array(boardSize.col).fill(0));

// 模拟落子
// chessboard[1][1] = 1
// chessboard[2][1] = 1
// chessboard[3][1] = 1
// chessboard[3][4] = 3
// chessboard[3][7] = 2

export default {
  name: "Gobang",
  data: () => ({
    boardSize,
    chessTypeMap,
    chessboard,
    player: "white", // 'white' | 'black'
    maxNum: 0, // 最大的连续棋子数量
    isOvered: false, // 游戏是否已经结束
    position: "", // 辅助调试
  }),
  methods: {
    play(row, col) {
      if (!this.isEmpty(row, col) || this.isOvered) return;
      this.chessboard[row][col] = this.chessTypeMap[this.player];
      this.getMaxNum(row, col, this.chessboard[row][col], () => {
        if (this.maxNum === 5) {
          // 游戏结束
          this.isOvered = true;
          setTimeout(() => {
            alert(this.player === "white" ? "白方胜利 ✌🏻" : "黑方胜利 ✌🏻");
          }, 0);
        } else {
          // 游戏继续
          this.player = this.player === "white" ? "black" : "white";
        }
      });
    },
    // 判断当前位置是否已有其它棋子
    isEmpty(row, col) {
      return this.chessboard[row][col] === 0;
    },
    /**
     * 获取最大的连续棋子的数量
     * @param {Number} row 落子第几行
     * @param {Number} col 落子第几列
     * @param {Number} type 落子的类型
     * @param {Function} cb 获取到 maxNum 之后执行的回调
     */
    getMaxNum(row, col, type, cb) {
      let num = 0; // 当前的连续棋子数量

      // 判断坐标是否有效
      const isValidCoord = (row, col) => {
        return col > -1 && col < 20 && row > -1 && row < 20;
      };

      // 纵向检查
      for (let i = row - 4; i <= row + 4; i++) {
        if (!isValidCoord(i, col)) continue;
        num = this.chessboard[i][col] === type ? num + 1 : 0;
        this.maxNum = this.maxNum > num ? this.maxNum : num;
      }
      num = 0;
      // 横向检查
      for (let i = col - 4; i <= col + 4; i++) {
        if (!isValidCoord(row, i)) continue;
        num = this.chessboard[row][i] === type ? num + 1 : 0;
        this.maxNum = this.maxNum > num ? this.maxNum : num;
      }
      num = 0;
      // 左斜线检查
      for (let i = -4; i <= 4; i++) {
        if (!isValidCoord(row + i, col + i)) continue;
        num = this.chessboard[row + i][col + i] === type ? num + 1 : num;
        this.maxNum = this.maxNum > num ? this.maxNum : num;
      }
      num = 0;
      // 右斜线检查
      for (let i = -4; i <= 4; i++) {
        if (!isValidCoord(row + i, col - i)) continue;
        num = this.chessboard[row + i][col - i] === type ? num + 1 : 0;
        this.maxNum = this.maxNum > num ? this.maxNum : num;
      }

      cb();
    },
    init() {
      this.isOvered = false;
      this.chessboard = new Array(boardSize.row)
        .fill(0)
        .map(() => new Array(boardSize.col).fill(0));
      this.player = "white";
      this.maxNum = 0;
    },
  },
};
</script>

<style scoped>
.gobang-container {
  width: 800px;
  height: 800px;
  border: 1px solid #ddd;

  display: flex;
  align-items: top;
  justify-content: top;
  flex-wrap: wrap;

  background-color: #e3be82;
}

.chess {
  width: 40px;
  height: 40px;
  box-sizing: border-box;
  border: 1px solid #999;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.chess.black::after,
.chess.white::after {
  content: "";
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.chess.black::after {
  background-color: #000;
}
.chess.white::after {
  background-color: #fff;
}
</style>
