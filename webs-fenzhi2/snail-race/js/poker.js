var pokerNumber = function (number) {
  var $this = this;
  var pokerAry = {
    "number": false,
    "flower": false,
    "flowerIcon": false,
    "color": false
  };
  var getNumber = function (num) {
    var str = Math.ceil(num / 4);
    var changeNumber = {
      1: "A",
      11: "J",
      12: "Q",
      13: "K"
    };
    return str;
  }
  var getFlower = function (num) {
    var flowerIcon = {
      "1": "♣",
      "2": "♦",
      "3": "♥",
      "0": "♠"
    };
    var flower = {
      "1": "club",
      "2": "diamond",
      "3": "heart",
      "0": "spade"
    };
    return [flower[num % 4], flowerIcon[num % 4]];
  }
  var getColor = function (num) {
    var color = {
      "1": "black",
      "2": "red",
      "3": "red",
      "0": "black"
    };
    return color[num % 4];
  }
  var init = function () {
    if (number > 0 && number <= 52) {
      pokerAry["number"] = getNumber(number);
      var flower = getFlower(number);
      pokerAry["flower"] = flower[0];
      pokerAry["flowerIcon"] = flower[1];
      pokerAry["color"] = getColor(number);
    }
    return pokerAry;
  }
  return init();
}
var shootGantry = function (door1, door2, ball) {
  var re = {
    "status": false
  }
  var door = [door1, door2];
  var ball = ball;
  door.sort(function (a, b) {
    return a - b
  });
  if (door[0] == ball || ball == door[1]) {
    return "HIT";
  } else {
    if (door[0] < ball && ball < door[1]) {
      return "IN";
    } else {
      return "OUT";
    }
  }
}