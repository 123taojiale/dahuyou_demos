# demo - 五子棋

## 项目启动

```shell
# 安装依赖
npm i

# 启动工程
npm run dev
```

**版本说明：**

- node 版本：`v18.4.0`
- npm 版本：`8.12.1`


## 业务逻辑分析

### 初始化棋盘

初始化一个二维数组，表示棋盘，使用0、1、2分别表示：
- 无棋：0
- 黑棋：1
- 白棋：2

### 落子

落子的逻辑：
- 判断当前位置是否有棋子
- 成功落子后走游戏结束判断逻辑

### 游戏结束

游戏结束的逻辑：根据当前落子的坐标和颜色、判断 4 条线：
- 横向
- 纵向
- 左斜线
- 右斜线

若连续的棋子数量达到 5 个，那么游戏结束

## From

![20220728174331](https://cdn.jsdelivr.net/gh/123taojiale/dahuyou_picture@main/blogs/20220728174331.png)

![20220728174411](https://cdn.jsdelivr.net/gh/123taojiale/dahuyou_picture@main/blogs/20220728174411.png)

![20220728174423](https://cdn.jsdelivr.net/gh/123taojiale/dahuyou_picture@main/blogs/20220728174423.png)