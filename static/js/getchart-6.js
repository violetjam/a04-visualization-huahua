var chart6 = echarts.init(document.getElementById("chart6"));
var Opt_chart6;

Opt_chart6 = {
  tooltip: {
    trigger: "axis",
  },
  legend: {
    textStyle: {
      color: "#ffffff",
    },
    data: ["最近2年", "最近3年"],
  },
  toolbox: {
    show: true,
    feature: {
      magicType: { show: true, type: ["line", "bar"] },
    },
  },
  calculable: true,
  xAxis: {
    name: "优选座位次数",
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    axisLine: {
      lineStyle: { color: "#b0c2f9" },
    },
    axisTick: { show: false },
    axisLabel: {
      fontSize: 12,
      color: "#b0c2f9",
      formatter: (value, index) => {
        return value + "次";
      },
    },
  },
  yAxis: {
    type: "value",
    name: "占比",
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
  series: [
    {
      name: "最近2年",
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: "line",
      smooth: true,
      lineStyle: {
        color: "#83bff6",
      },
    },
    {
      name: "最近3年",
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: "line",
      smooth: true,
      lineStyle: {
        color: "#eef683",
      },
    },
  ],
};

Opt_chart6 && chart6.setOption(Opt_chart6);

$.ajax({
  url: "static/data/6_y2.json",
  dataType: "json",
})
  .done(function (data) {
    console.log("Data: ", data);

    //Opt_chart6.xAxis.data=data.keys
    Opt_chart6.series[0].data = data.values;
    chart6.setOption(Opt_chart6);
  })
  .fail(function (jqXHR) {
    console.log("Ajax Fail: ", jqXHR.status, jqXHR.statusText);
  });
$.ajax({
  url: "static/data/6_y3.json",
  dataType: "json",
})
  .done(function (data) {
    console.log("Data: ", data);
    Opt_chart6.xAxis.data = data.keys;
    Opt_chart6.series[1].data = data.values;
    chart6.setOption(Opt_chart6);
  })
  .fail(function (jqXHR) {
    console.log("Ajax Fail: ", jqXHR.status, jqXHR.statusText);
  });
/********** 浏览器窗口改变时，重置报表大小 ****************/
window.onresize = function () {
  chart6.resize();
};
