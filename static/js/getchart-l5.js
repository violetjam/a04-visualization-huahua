var chartl5 = echarts.init(document.getElementById("chartl5"));
var Opt_chartl5;

Opt_chartl5 = {
  tooltip: {
    trigger: "axis",
  },
  legend: {
    textStyle: {
      color: "#ffffff",
    },
    data: ["总人数", "付费选座人数"],
  },
  toolbox: {
    show: true,
    feature: {
      magicType: { show: true, type: ["line", "bar"] },
    },
  },
  calculable: true,
  xAxis: {
    type: "category",
    name: "舱位编号",
    data: ["Mon", "Tue", "Wed", "Thu"],
    axisLine: {
      lineStyle: { color: "#b0c2f9" },
    },
    axisTick: {
      alignWithLabel: true,
    },
    axisLabel: {
      fontSize: 12,
      color: "#b0c2f9",
    },
  },
  yAxis: [
    {
      type: "value",
      name: "总数",
      splitNumber: 5,
      axisLine: {
        lineStyle: { color: "#b0c2f9" },
      },
      splitLine: { show: false },
      axisTick: { color: "#b0c2f9" },
      axisLabel: {
        fontSize: 12,
        color: "#b0c2f9",
      },
    },
    {
      type: "value",
      name: "付费选座人数",
      splitNumber: 5,
      axisLine: {
        lineStyle: { color: "#b0c2f9" },
      },
      splitLine: { show: false },
      axisTick: { color: "#b0c2f9" },
      axisLabel: {
        fontSize: 12,
        color: "#b0c2f9",
      },
    },
  ],
  series: [
    {
      name: "总人数",
      type: "bar",
      showBackground: true,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#83bff6" },
          { offset: 0.5, color: "#188df0" },
          { offset: 1, color: "#188df0" },
        ]),
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#2378f7" },
            { offset: 0.7, color: "#2378f7" },
            { offset: 1, color: "#83bff6" },
          ]),
        },
      },
    },
    {
      name: "付费选座人数",
      type: "bar",
      showBackground: true,
      yAxisIndex: 1,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#83f6e9" },
          { offset: 0.5, color: "#18f0d0" },
          { offset: 1, color: "#18f0de" },
        ]),
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#23f7c6" },
            { offset: 0.7, color: "#23f0f7" },
            { offset: 1, color: "#83ecf6" },
          ]),
        },
      },
    },
  ],
};
Opt_chartl5 && chartl5.setOption(Opt_chartl5);
$.ajax({
  url: "static/data/l5_1.json",
  dataType: "json",
  timeout: 10000,
})
  .done(function () {
    $("#chartl5").addClass("chart-done");
  })
  .done(function (data) {
    Opt_chartl5.xAxis.data = data.keys;
    Opt_chartl5.series[1].data = data.values;
    chartl5.setOption(Opt_chartl5);
  })
  .fail(function (jqXHR) {
    console.log("Ajax Fail: ", jqXHR.status, jqXHR.statusText);
  });
$.ajax({
  url: "static/data/l5_2.json",
  dataType: "json",
  timeout: 10000,
})
  .done(function () {
    $("#chartl5").addClass("chart-done");
  })
  .done(function (data) {
    Opt_chartl5.series[0].data = data.values;
    chartl5.setOption(Opt_chartl5);
  })
  .fail(function (jqXHR) {
    console.log("Ajax Fail: ", jqXHR.status, jqXHR.statusText);
  });
/********** 浏览器窗口改变时，重置报表大小 ****************/
window.onresize = function () {
  chartl5.resize();
};
