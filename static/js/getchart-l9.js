var chartl9 = echarts.init(document.getElementById("chartl9"));
var Opt_chartl9;
Opt_chartl9 = {
  tooltip: {
    trigger: "item",
    formatter: "{b0}<br />占比：{d0}%",
  },
  legend: {
    textStyle: {
      color: "#ffffff",
    },
    orient: "vertical",
    left: "left",
  },
  series: [
    {
      name: "占比",
      type: "pie",
      radius: "50%",
      itemStyle: {
        normal: {
          shadowBlur: 200,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};

Opt_chartl9 && chartl9.setOption(Opt_chartl9);
$.ajax({
  url: "static/data/l9.json",
  // url: "/l9",
  dataType: "json",
})
  .done(function (data) {
    const chartData = [];
    for (let i in data.keys) {
      chartData.push({
        name: data.keys[i],
        value: data.values[i],
      });
    }
    chartl9.setOption({
      series: [
        {
          name: "占比",
          data: chartData,
        },
      ],
    });
  })
  .fail(function (jqXHR) {
    console.log("Ajax Fail: ", jqXHR.status, jqXHR.statusText);
  });
/********** 浏览器窗口改变时，重置报表大小 ****************/
window.onresize = function () {
  chartr4.resize();
};
