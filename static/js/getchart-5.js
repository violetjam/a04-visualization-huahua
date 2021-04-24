var chart5_data=[{name: 'Afghanistan', value: 28397.812},
                {name: 'Angola', value: 19549.124},
                {name: 'Albania', value: 3150.143},
                {name: 'United Arab Emirates', value: 8441.537},
                ]
				const chart5 = echarts.init(document.getElementById("chart5"));
				const Opt_chart5 = {
				     tooltip: {
                        formatter:function(params){
                            return params.name+'<br />'+params.seriesName+'：'+params.value/10+'%'
                        }
                    },
                    visualMap: {
                        show:true,
                        min: 0,
                        max: 1500,
                        left:'left',
                        top:'250px',
                        textStyle:{fontsize:5,color:'#fff'},
                        inRange: {
                                    color: ['#e0ffff', '#069']
                                },
                        splitList:[{start:0,end:20},
                                    {start:20,end:40},
                                    {start:40,end:60},
                                    {start:60,end:80},
                                    {start:80,end:100},
                                    {start:80,end:100},
                                    {start:100,end:120},
                                    {start:120}]

                    },
                 geo: {
				        map: 'world',
				        roam: true, //开启鼠标缩放和漫游
				        zoom: 1, //地图缩放级别
						selectedMode: false, //选中模式：single | multiple
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
						layoutCenter: ['50%', '50%'], //设置后left/right/top/bottom等属性无效
						layoutSize: '150%', //保持地图宽高比
				        label: {
				            emphasis: {
				                show: false
				            }
				        },
				        itemStyle: {
				            normal: {
				                areaColor: '#101f32',
				                borderWidth: 1.1,
				                borderColor: '#43d0d6'
				            },
				            emphasis: {
				                areaColor: '#004a99'
				            }
				        }
				    },

                    series: [
                        {
                            name: '付费选座意愿占比',
                            type: 'map',
                            geoIndex: 0,
                        }
                    ]
				};
				chart5.setOption(Opt_chart5);

                $.ajax({
					url: "static/data/5.json",
					dataType: "json",
                    timeout:10000
				}).done(function(data) {
				    var map=[];

				    for(var i in data.name){
				        var str={};
				        str.name=data.name[i];
				        str.value=data.value[i];
                        map.push(str);
                    }
				    console.log("Data: ", map);
                    Opt_chart5.series[0].data=map
                    chart5.setOption(Opt_chart5)
				}).fail(function(jqXHR) {
					console.log("Ajax Fail: ", jqXHR.status, jqXHR.statusText);
				});

				//浏览器窗口大小变化时，重置报表大小
				$(window).resize(function() {
					chart5.resize();
				});