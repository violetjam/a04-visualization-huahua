$(function () {
  //获取当天日期
  (function () {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    $("#nowDate").html(year + "年" + month + "月" + day + "日");
  })();

  //获取统计数据
  $.ajax({
    type: "get",
    url: "static/data/count-data.json",
    dataType: "json",
  })
    .done(function (data) {
      //console.log('Data: ', data);
      rollNum("records", 0, data.count_records);
      rollNum("features", 0, data.count_features);
      rollNum("selects", 0, data.count_selects);
      rollNum("test_accuracy", 0, data.test_accuracy, 2);
      rollNum("practise_accuracy", 0, data.practise_accuracy, 2);
    })
    .fail(function (jqXHR, textStatus) {
      console.log("Ajax Error: ", textStatus);
    });
});

//数字变化特效
function rollNum(elId, startVal, endVal, decimalNum) {
  let n = decimalNum || 0;
  let countUp = new CountUp(elId, startVal, endVal, n, 2.5, {
    useEasing: true,
    useGrouping: true,
    separator: ",",
    decimal: ".",
  });
  if (!countUp.error) {
    countUp.start();
  } else {
    console.error(countUp.error);
  }
}
