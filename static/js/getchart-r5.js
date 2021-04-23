var chart5 = echarts.init(document.getElementById("chart5"));
var Opt_chart5;
Opt_chart5 = {
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
          color: function (params) {
            let colorList = [
              "#f3b7c8",
              "#86f5eb",
              "#a8ace3",
              "#e3c29b",
              "#4566e2",
              "#ff8162",
              "#59865a",
              "#c29ac7",
            ];
            return colorList[params.dataIndex];
          },
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

Opt_chart5 && chart5.setOption(Opt_chart5);
$.ajax({
  url: "static/data/5.json",
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
    chart5.setOption({
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
  chartl4.resize();
  chart5.resize();
};
