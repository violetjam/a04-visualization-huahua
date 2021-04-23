$(function () {
  /******************* 地图飞线 ******************/
  //初始化echarts实例
  const flyMap = echarts.init(document.getElementById("flyMap"));
  //城市经纬度
  const originName = "上海";
  const flyGeo = {
    "New York": [-73.4644, 40.3823],
    Sydney: [151.1038, -33.5646],
    California: [-118.15, 34.04],
    上海: [121.4692688, 31.23817635],
  };
  //飞线数据
  var flyVal = [
    [{ name: "上海", value: 100 }, { name: "上海" }],
    [{ name: "New York", value: 90 }, { name: "上海" }],
    [{ name: "California", value: 62 }, { name: "上海" }],
    [{ name: "Sydney", value: 31 }, { name: "上海" }],
  ];
  const convertFlyData = function (data) {
    let res = [];
    for (let i = 0; i < data.length; i++) {
      let dataItem = data[i];
      let toCoord = flyGeo[dataItem[0].name];
      let fromCoord = flyGeo[dataItem[1].name];
      if (fromCoord && toCoord) {
        res.push({
          fromName: dataItem[1].name,
          toName: dataItem[0].name,
          coords: [fromCoord, toCoord],
        });
      }
    }
    return res;
  };
  //报表配置
  const flySeries = [];
  [[originName, flyVal]].forEach(function (item, i) {
    flySeries.push(
      {
        name: item[0],
        type: "lines",
        zlevel: 1,
        symbol: ["none", "none"],
        symbolSize: 0,
        effect: {
          //特效线配置
          show: true,
          period: 5, //特效动画时间，单位s
          trailLength: 0.1, //特效尾迹的长度，从0到1
          symbol: "arrow",
          symbolSize: 5,
        },
        lineStyle: {
          normal: {
            color: "#fff",
            width: 1,
            opacity: 0.6,
            curveness: 0.2, //线的平滑度
          },
        },
        data: convertFlyData(item[1]),
      },
      {
        name: item[1],
        type: "effectScatter",
        coordinateSystem: "geo",
        zlevel: 2,
        rippleEffect: {
          //涟漪特效
          period: 5, //特效动画时长
          scale: 4, //波纹的最大缩放比例
          brushType: "stroke", //波纹的绘制方式：stroke | fill
        },
        label: {
          normal: {
            show: false,
            position: "right",
            formatter: "{b}",
          },
        },
        symbol: "circle",
        symbolSize: function (val) {
          //根据某项数据值设置符号大小
          return val[2] / 10;
        },
        itemStyle: {
          normal: {
            color: "#fff",
          },
        },
        data: item[1].map(function (dataItem) {
          return {
            name: dataItem[0].name,
            value: flyGeo[dataItem[0].name].concat([dataItem[0].value]),
          };
        }),
      },
      {
        //与上层的点叠加
        name: item[1],
        type: "scatter",
        coordinateSystem: "geo",
        zlevel: 3,
        symbol: "circle",
        symbolSize: function (val) {
          //根据某项数据值设置符号大小
          return val[2] / 15;
        },
        itemStyle: {
          normal: {
            color: "#fff",
          },
        },
        data: item[1].map(function (dataItem) {
          return {
            name: dataItem[0].name,
            value: flyGeo[dataItem[0].name].concat([dataItem[0].value]),
          };
        }),
      }
    );
  });

  //报表配置项
  const flyMapOpt = {
    title: {
      show: false,
      text: "地图飞线",
      x: "center",
      textStyle: {
        color: "#fff",
      },
    },
    tooltip: {
      trigger: "item",
      formatter: function (params) {
        switch (params.name) {
          case "上海":
            return "出发地：上海";
          case "New York":
            return "肯尼迪国际机场(JFK)</br>占比：90%";
          case "California":
            return "洛杉矶国际机场(LAX)</br>占比：62%";
          case "Sydney":
            return "悉尼金斯福德·史密斯国际机场(SYD)</br>占比：31%";
        }
      },
    },
    geo: {
      map: "world",
      roam: false, //开启鼠标缩放和漫游
      zoom: 1.5, //地图缩放级别
      selectedMode: false, //选中模式：single | multiple
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      layoutCenter: ["50%", "50%"], //设置后left/right/top/bottom等属性无效
      layoutSize: "100%", //保持地图宽高比
      label: {
        emphasis: {
          show: false,
        },
      },
      itemStyle: {
        normal: {
          areaColor: "#101f32",
          borderWidth: 1.1,
          borderColor: "rgb(94,192,255)",
        },
        emphasis: {
          areaColor: "#006699",
        },
      },
    },
    series: flySeries,
  };
  //渲染报表
  flyMap.setOption(flyMapOpt);

  /********** 浏览器窗口改变时，重置报表大小 ****************/
  window.onresize = function () {
    flyMap.resize();
  };
});
