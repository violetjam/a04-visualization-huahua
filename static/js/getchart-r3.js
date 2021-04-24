//r3
const chartr3 = echarts.init(document.getElementById("chartr3"), "shine");
const Opt_chartr3 = {
  // type的slider和inside可以同时保留，既可以保留滚动条，也可以在内部拖动
  dataZoom: [
    //3.纵向使用滚动条
    {
      type: "slider",
      show: true,
      yAxisIndex: [0], //设置组件控制的y轴
      left: "96%", //距离左侧的距离 可以使百分比，也可以是像素 left: '30'（30像素）
      start: -2,
      end: 50,
    },
    //4.在内部可以纵向拖动
    {
      type: "inside",
      yAxisIndex: [0],
      start: -2,
      end: 50,
    },
  ],
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
        "付费意愿程度：" +
        param.value +
        suffix
      );
    },
  },
  grid: {
    top: 10,
    bottom: 10,
    left: 130,
  },
  xAxis: {
    show: false,
    type: "value",
  },
  yAxis: {
    type: "category",
    inverse: true,
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      fontSize: 12,
      color: "#b0c2f9",
    },
  },
  series: [
    {
      name: "付费意愿程度排行",
      type: "bar",
      barCategoryGap: "60%",
      label: {
        show: true,
        position: "right",
        fontSize: 12,
        color: "#43d0d6",
        emphasis: {
          color: "#e6b600",
        },
      },
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: "#b0c2f9" },
            { offset: 0.5, color: "#6cced7" },
            { offset: 1, color: "#43d0d6" },
          ]),
        },
        emphasis: {
          color: new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: "#b0c2f9" },
            { offset: 0.7, color: "#e6b600" },
            { offset: 1, color: "#ceac09" },
          ]),
        },
      },
    },
  ],
};
chartr3.setOption(Opt_chartr3);
$.ajax({
  url: "static/data/r3.json",
  dataType: "json",
  timeout: 10000,
})
  .done(function () {
    $("#chartr3").addClass("chart-done");
  })
  .done(function (data) {
    Opt_chartr3.yAxis.data = data.keys;
    Opt_chartr3.series[0].data = data.values;

    chartr3.setOption(Opt_chartr3);
  })
  .fail(function (jqXHR) {
    console.log("Ajax Fail: ", jqXHR.status, jqXHR.statusText);
  });

//浏览器窗口大小变化时，重置报表大小
$(window).resize(function () {
  chartr3.resize();
});
