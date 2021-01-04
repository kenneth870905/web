import _ from "./lodash";
// const _ = require("./lodash");

const GameResult = {
  Banker: "banker", //庄
  Player: "player", // 闲
  Tie: "tie", //和
};

class RoadmapGenerator {
  bigRoad(gameResults = [], { columns = 40, rows = 6, scroll = true } = {}) {
    let tieStack = []; //和堆栈
    let placementMap = {}; //放置图
    let logicalColumnNumber = 0; // 逻辑列号
    let lastItem; // 最后一项
    let returnList = []; // 返回结果
    let maximumColumnReached = 0; // 达到最大列
    // 开始
    gameResults.forEach((gameResult) => {
      // 如果开奖结果为和
      if (gameResult.outcome === GameResult.Tie) {
        tieStack.push(gameResult); // 开奖结果推到和堆栈
      } else {
        // 判断最后一项
        if (lastItem) {
          let lastItemInResults = returnList[returnList.length - 1];
          // 判断最后一项等于和
          if (lastItem.outcome === GameResult.Tie) {
            if (lastItemInResults) {
              lastItemInResults.ties = _.cloneDeep(tieStack);
              tieStack = [];
            }
          }
          if (lastItemInResults) {
            if (lastItemInResults.result.outcome !== gameResult.outcome) {
              //如果此项目的结果不同
              //最后一个游戏，那么我们必须将其放置在另一个游戏中栏
              logicalColumnNumber++;
            }
          } else {
            logicalColumnNumber = 1; // 右移动一步
            returnList.push({
              ties: _.cloneDeep(tieStack),
              column: 0,
              row: 0,
              logicalColumn: 0,
              result: {
                outcome: "tie",
              },
            });
            tieStack = [];
          }
        }
        let probeColumn = logicalColumnNumber;
        let probeRow = 0;
        let done = false;
        while (!done) {
          let keySearch = `${probeColumn}.${probeRow}`;
          let keySearchBelow = `${probeColumn}.${probeRow + 1}`;
          //在当前探针位置可用的位置
          if (!_.get(placementMap, keySearch)) {
            let newEntry = _.merge(
              {},
              {
                row: probeRow,
                column: probeColumn,
                logicalColumn: logicalColumnNumber,
                ties: _.cloneDeep(tieStack),
              },
              { result: gameResult }
            );
            _.set(placementMap, keySearch, newEntry); // 没找到就设置placementMap
            returnList.push(placementMap[probeColumn][probeRow]); // placementMap把推到returnList
            console.log(probeColumn);
            tieStack = [];
            done = true;
          } else if (probeRow + 1 >= rows) {
            //下面的位置将超出表格范围，出现长龙。
            probeColumn++; // 往右走
          } else if (!_.get(placementMap, keySearchBelow)) {
            // 下面的位置为空。
            probeRow++; //往下走
          } else if (
            _.get(placementMap, keySearchBelow).result.outcome ===
            gameResult.outcome
          ) {
            // 以下结果是相同的结果。
            // probeRow++; //往下走
            done = true;
          } else {
            probeColumn++;
          }
        }
        maximumColumnReached = Math.max(maximumColumnReached, probeColumn);
      }
      lastItem = gameResult;
    });

    //处理和
    if (_.isEmpty(returnList) && tieStack.length > 0) {
      returnList.push({
        ties: _.cloneDeep(tieStack),
        column: 0,
        row: 0,
        logicalColumn: 0,
        result: {
          // outcome: "tie",
        },
      });
    } else if (!_.isEmpty(returnList)) {
      _.last(returnList).ties = _.cloneDeep(tieStack);
    }
    // 是否往左移动
    if (scroll) {
      returnList = this.scrollBigRoad(
        returnList,
        maximumColumnReached,
        columns
      );
    }

    return returnList;
  }

  // 判断是否滚动
  scrollBigRoad(results = [], highestDrawingColumn, drawingColumns) {
    const highestDrawableIndex = drawingColumns - 1;
    const offset = Math.max(0, highestDrawingColumn - highestDrawableIndex);

    let validItems = results.filter((value) => value.column - offset >= 0);

    validItems.forEach((value) => (value.column -= offset));

    return validItems;
  }
}
new RoadmapGenerator();
// module.exports = RoadmapGenerator;
