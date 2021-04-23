var chartr4 = echarts.init(document.getElementById("chartr4"));
var Opt_chartr4;
Opt_chartr4 = {
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
              "#FF0000",
              "#FE8463",
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

Opt_chartr4 && chartr4.setOption(Opt_chartr4);
$.ajax({
  url: "static/data/r4.json",
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
    chartr4.setOption({
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
