
            var chart8 = echarts.init(document.getElementById('chart8'));
            var Opt_chart8;

            Opt_chart8 = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    textStyle: {
                      color: "#ffffff"
                    },
                    data: ['第二意愿','第三意愿','第四意愿']
                },
                calculable: true,
                xAxis: {
                    type: 'category',
                    name:'航线编号',
                    data: ['Mon', 'Tue', 'Wed', 'Thu'],
					axisLine: {
                        lineStyle: {color: "#b0c2f9"}
                    },
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel: {
                        fontSize: 12,
                        color: "#b0c2f9",

                    }
                },
                yAxis: {
                    type: 'value',
                    name: "付费意愿占比",
                    splitNumber: 1,
                    axisLine: {
                        lineStyle: {color: "#b0c2f9"}
                    },
                    splitLine: {show: false},
                    axisTick: {color: "#b0c2f9"},
                    axisLabel: {
                        fontSize: 12,
                        color: "#b0c2f9",

                    }
                },
                series: [
                    {
                        name:'第二意愿',
                        type: 'line',
                        showBackground: true,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#83f6e9'},
                                    {offset: 0.5, color: '#18f0d0'},
                                    {offset: 1, color: '#18f0de'}
                                ]
                            )
                        },
                        emphasis: {
                            itemStyle: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#23f7c6'},
                                        {offset: 0.7, color: '#23f0f7'},
                                        {offset: 1, color: '#83ecf6'}
                                    ]
                                )
                            }
                        },

                    },
                    {
                        name:'第三意愿',
                        type: 'line',
                        showBackground: true,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#eef683'},
                                    {offset: 0.5, color: '#f0e518'},
                                    {offset: 1, color: '#f0cc18'}
                                ]
                            )
                        },
                        emphasis: {
                            itemStyle: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#f7c923'},
                                        {offset: 0.7, color: '#f7bb23'},
                                        {offset: 1, color: '#f6eb83'}
                                    ]
                                )
                            }
                        },

                    },
                     {
                        name:'第四意愿',
                        type: 'line',
                        showBackground: true,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#838ff6'},
                                    {offset: 0.5, color: '#1823f0'},
                                    {offset: 1, color: '#182ef0'}
                                ]
                            )
                        },
                        emphasis: {
                            itemStyle: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#2358f7'},
                                        {offset: 0.7, color: '#235ff7'},
                                        {offset: 1, color: '#83a4f6'}
                                    ]
                                )
                            }
                        },

                    }
                ]
            };
            Opt_chart8 && chart8.setOption(Opt_chart8);
            $.ajax({
					url: "static/data/8_2.json",
                // url: "/8_2",
					dataType: "json",
                    timeout:10000
				}).done(function() {
					$("#chart8").addClass("chart-done");
				}).done(function(data) {

                    Opt_chart8.series[0].data=data.values
                    chart8.setOption(Opt_chart8);
				}).fail(function(jqXHR) {
					console.log("Ajax Fail: ", jqXHR.status, jqXHR.statusText);
				});

            $.ajax({
					url: "static/data/8_3.json",
                // url: "/8_3",
					dataType: "json",
                    timeout:10000
				}).done(function() {
					$("#chart8").addClass("chart-done");
				}).done(function(data) {
                    Opt_chart8.series[1].data=data.values
                    chart8.setOption(Opt_chart8);
				}).fail(function(jqXHR) {
					console.log("Ajax Fail: ", jqXHR.status, jqXHR.statusText);
				});
            $.ajax({
					url: "static/data/8_4.json",
                // url: "/8_4",
					dataType: "json",
                    timeout:10000
				}).done(function() {
					$("#chart8").addClass("chart-done");
				}).done(function(data) {
				    Opt_chart8.xAxis.data=data.keys
                    Opt_chart8.series[2].data=data.values
                    chart8.setOption(Opt_chart8);
				}).fail(function(jqXHR) {
					console.log("Ajax Fail: ", jqXHR.status, jqXHR.statusText);
				});
            /********** 浏览器窗口改变时，重置报表大小 ****************/
				window.onresize = function() {
					chart8.resize();
				}

