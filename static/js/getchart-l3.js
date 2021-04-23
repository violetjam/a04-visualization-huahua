//l3
var chartl3 = echarts.init(document.getElementById("chartl3"));
var Opt_chartl3;

Opt_chartl3 = {
  grid: {
    left: "10%",
    bottom: "20%",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    formatter: function (params) {
      const param = params[0];
      const marker =
        '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#e6b600;"></span>';
      const suffix = '<span style="margin-left:5px;font-size:12px;"></span>';
      return (
        param.name +
        "<br />" +
        marker +
        "排名：" +
        (param.dataIndex + 1) +
        "<br />" +
        marker +
        "与目标列的相关度：" +
        param.value +
        suffix
      );
    },
  },
  xAxis: {
    type: "category",
    name: "特征名称",
    data: ["Mon", "Tue", "Wed", "Thu"],
    axisLine: {
      lineStyle: { color: "#b0c2f9" },
    },
    axisTick: { alignWithLabel: true },
    axisLabel: {
      fontSize: 12,
      color: "#b0c2f9",
      rotate: 38,
    },
  },
  yAxis: {
    type: "value",
    name: "相关度",
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
  ],
};
Opt_chartl3 && chartl3.setOption(Opt_chartl3);
$.ajax({
  url: "static/data/l3.json",
  dataType: "json",
  timeout: 10000,
})
  .done(function () {
    $("#chartl3").addClass("chart-done");
  })
  .done(function (data) {
    chartl3.setOption({
      xAxis: {
        data: data.keys,
      },
      series: [
        {
          name: "相关度",
          data: data.values,
        },
      ],
    });
  })
  .fail(function (jqXHR) {
    console.log("Ajax Fail: ", jqXHR.status, jqXHR.statusText);
  });
/********** 浏览器窗口改变时，重置报表大小 ****************/
window.onresize = function () {
  charl3.resize();
};
