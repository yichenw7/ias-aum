import React from "react";
import "./style.less";
import echarts from "../../../components/echarts";
import { connect } from "react-redux";
import action from "../../../actions";

class AumChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aums: ['aum30','aum7'],
      activity: {mau: '月活跃度',wau: '周活跃度'},
      echartLists: [
        {id:1,tabName: 'aum30'},
        {id:2,tabName: 'aum7'},
        {id:3,tabName: '月活跃度'},
        {id:4,tabName: '周活跃度'},
      ],
    }
  }

  componentWillMount() {
    action.emit("aum.aum30");
    action.emit("aum.aum7");
    action.emit("aum.mau");
    action.emit("aum.wau");
  }

  componentWillReceiveProps(nextProps) {
    const Oli = document.querySelectorAll("#list li");
    Oli[0].className = 'active';
    const aum30 = nextProps.aum30;
    const aum7 = nextProps.aum7;
    const mau = nextProps.mau;
    const wau = nextProps.wau;

    const date_30= [];
    const date_7 = [];
    const aum_30 = [];
    const aum_7 = [];
    const termMau = [];
    const termWau = [];
    const cntMau = [];
    const cntWau = [];

    //AUM30
    if (Array.isArray(aum30) && aum30.length > 0) {
      aum30.forEach(item => {
        date_30.push(item.date);
        aum_30.push(item.aum/1e8);
      });
      const aum30Chart = echarts.init(document.getElementById("aum30"));
      const aum30Option = {
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['aum30'],
        }, 
        grid: {
          left: '2%',
          right: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: date_30,
          axisLabel: {
            rotate: 40
          },
          axisLine: {
            symbol: ['none', 'arrow'],
            symbolSize: [7,15],
            symbolOffset: 13,
          },
          axisTick: {
            inside : true,
          }
        },
        yAxis: {
          type: 'value',
          name: 'aum30/亿',
          nameTextStyle: {
            color: '#000',
            fontSize: 16,
          },
          axisLine: {
            symbol: ['none', 'arrow'],
            symbolSize: [7,15],
            symbolOffset: 13,
          },
          axisTick: {
            inside : true,
          }
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 100,
          },
          {
            start: 0,
            end: 100,
            hideleSize: '80%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }
        ],
        series: [
          {
            type: 'line',
            itemStyle: {
              color: '#D2691E' //图标颜色
            },
            lineStyle: {
              width: 2, //连线粗细
              color: '#FFA500', //连线颜色
            },
            name: 'aum30',
            data: aum_30,
          }
        ]
      };
      aum30Chart.setOption(aum30Option);

      //AUM7
      if (Array.isArray(aum7) && aum7.length > 0) {
        aum7.forEach(item => {
          date_7.push(item.date);
          aum_7.push(item.aum/1e8);
        });
        const aum7Chart = echarts.init(document.getElementById("aum7"));
        const aum7Option = {
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['aum7'],
          }, 
          grid: {
            left: '2%',
            right: '3%',
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            data: date_7,
            axisLabel: {
              rotate: 40
            },
            axisLine: {
              symbol: ['none', 'arrow'],
              symbolSize: [7,15],
              symbolOffset: 13,
            },
            axisTick: {
              inside : true,
            },
          },
          yAxis: {
            type: 'value',
            name: 'aum7/亿',
            nameTextStyle: {
              color: '#000',
              fontSize: 16,
            },
            axisLine: {
              symbol: ['none', 'arrow'],
              symbolSize: [7,15],
              symbolOffset: 13,
            },
            axisTick: {
              inside : true,
            },
          },
          dataZoom: [
            {
              type: 'inside',
              start: 0,
              end: 100,
            },
            {
              start: 0,
              end: 100,
              hideleSize: '80%',
              handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
              }
            }
          ],
          series: [
            {
              type: 'line',
              itemStyle: {
                color: '#D2691E' //图标颜色
              },
              lineStyle: {
                width: 2, //连线粗细
                color: '#FFA500', //连线颜色
              },
              name: 'aum7',
              data: aum_7,
            }
          ]
        };
        aum7Chart.setOption(aum7Option);

        //月活跃度
        if (Array.isArray(mau) && mau.length > 0) {
          mau.forEach(item => {
            termMau.push(item.term);
            cntMau.push(item.cnt);
          });
          const mauChart = echarts.init(document.getElementById("mau"));
          const mauOption = {
            tooltip: {
              trigger: 'axis',
            },
            legend: {
              data: ['月活跃度'],
            }, 
            grid: {
              left: '2%',
              right: '3%',
              containLabel: true,
            },
            xAxis: {
              type: 'category',
              data: termMau,
              axisLabel: {
                rotate: 40
              },
              axisLine: {
                symbol: ['none', 'arrow'],
                symbolSize: [7,15],
                symbolOffset: 13,
              },
              axisTick: {
                inside : true,
              },
            },
            yAxis: {
              type: 'value',
              axisLine: {
                symbol: ['none', 'arrow'],
                symbolSize: [7,15],
                symbolOffset: 13,
              },
              axisTick: {
                inside : true,
              },
            },
            dataZoom: [
              {
                type: 'inside',
                start: 0,
                end: 100,
              },
              {
                start: 0,
                end: 100,
                hideleSize: '80%',
                handleStyle: {
                  color: '#fff',
                  shadowBlur: 3,
                  shadowColor: 'rgba(0, 0, 0, 0.6)',
                  shadowOffsetX: 2,
                  shadowOffsetY: 2
                }
              }
            ],
            series: [{
              type: 'bar',
              itemStyle: {
                color: '#b3ecff', //连线颜色
              },
              name: '月活跃度',
              data: cntMau,
            }],
          };
          mauChart.setOption(mauOption);

          //周活跃度
          if (Array.isArray(wau) && wau.length > 0) {
            wau.forEach(item => {
              termWau.push(item.term);
              cntWau.push(item.cnt);
            });
            const wauChart = echarts.init(document.getElementById("wau"));
            const wauOption = {
              tooltip: {
                trigger: 'axis',
              },
              legend: {
                data: ['周活跃度'],
              }, 
              grid: {
                left: '2%',
                right: '3%',
                containLabel: true,
              },
              xAxis: {
                type: 'category',
                data: termWau,
                axisLabel: {
                  rotate: 40
                },
                axisLine: {
                  symbol: ['none', 'arrow'],
                  symbolSize: [7,15],
                  symbolOffset: 13,
                },
                axisTick: {
                  inside : true,
                },
              },
              yAxis: {
                type: 'value',
                axisLine: {
                  symbol: ['none', 'arrow'],
                  symbolSize: [7,15],
                  symbolOffset: 13,
                },
                axisTick: {
                  inside : true,
                },
              },
              dataZoom: [
                {
                  type: 'inside',
                  start: 0,
                  end: 100,
                },
                {
                  start: 0,
                  end: 100,
                  hideleSize: '80%',
                  handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                  }
                }
              ],
              series: [{
                type: 'bar',
                itemStyle: {
                  color: '#b3ecff', //连线颜色
                },
                name: '周活跃度',
                data: cntWau,
              }],
            };
            wauChart.setOption(wauOption);
          }
        }
      }
    };
  }
  
  handleClick(item){
    const Oli = document.querySelectorAll("#list li");
    const Odiv = document.querySelectorAll("#echarts>div");

    for(var i=0;i<Oli.length;i++){
      for(var j=0;j<Odiv.length;j++){
        Oli[j].className = "";
        Odiv[j].className = "";
        if(Odiv[j].id == item) {
          Oli[j].className = "active";
          Odiv[j].className = "active";
        }
      }
		}
  }

  render() {
    return (
      <div>
        <div id="list">
          <div class="listDetails">
            <div class="aum">
              <h3>AUM</h3>
              <ul>
                {this.state.aums.map((item,index) => 
                  <li onClick={() => this.handleClick(item)}>{item}</li>
                )}
              </ul>
            </div>
            <div class="activity">
              <h3>活跃度</h3>
              <ul>
                {Object.keys(this.state.activity).map(item => 
                  <li key={item} onClick={() => this.handleClick(item)} >{this.state.activity[item]}</li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div id="echarts">
         <div id="aum30" class="active"></div>
         <div id="aum7"></div>
         <div id="mau"></div>
         <div id="wau"></div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    aum30: state.aum.aum30.result,
    aum7: state.aum.aum7.result,
    mau: state.aum.mau.result,
    wau: state.aum.wau.result,
  };
}

export default connect(mapStateToProps)(AumChart);
