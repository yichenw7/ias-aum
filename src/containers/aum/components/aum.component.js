import React from "react";
import "./style.less";
import echarts from "../../../components/echarts";
import { connect } from "react-redux";
import action from "../../../actions";

class AumChart extends React.Component {
  constructor(props) {
    super(props);
    const commonOption = {
      option: {
        tooltip: {
          trigger: 'axis',
        },
        grid: {
          left: '2%',
          right: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
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
          }
        ]
      }
    }
    this.state = {
      aums: ['aum30','aum7'],
      activity: {mau: '月活跃度',wau: '周活跃度'},
      echartLists: [
        {id:1,tabName: 'aum30'},
        {id:2,tabName: 'aum7'},
        {id:3,tabName: '月活跃度'},
        {id:4,tabName: '周活跃度'},
      ],
      aum30: commonOption,
      aum7: commonOption,
      mau: commonOption,
      wau: commonOption,
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
      if (Array.isArray(aum7) && aum7.length > 0) {
        aum7.forEach(item => {
          date_7.push(item.date);
          aum_7.push(item.aum/1e8);
        });
        if (Array.isArray(mau) && mau.length > 0) {
          mau.forEach(item => {
            termMau.push(item.term);
            cntMau.push(item.cnt);
          });
          if (Array.isArray(wau) && wau.length > 0) {
            wau.forEach(item => {
              termWau.push(item.term);
              cntWau.push(item.cnt);
            });
            this.setState({
              aum30: {
                option: {
                  legend: {
                    data: ['aum30'],
                  }, 
                  xAxis: {
                    data: date_30,
                  },
                  yAxis: {
                    name: 'aum30/亿',
                  },
                  series: [{
                    name: 'aum30',
                    data: aum_30,
                  }],
                }
              },
              aum7: {
                option: {
                  legend: {
                    data: ['aum7'],
                  }, 
                  xAxis: {
                    data: date_7,
                  },
                  yAxis: {
                    name: 'aum7/亿',
                  },
                  series: [{
                    name: 'aum7',
                    data: aum_7,
                  }],
                }
              },
              mau: {
                option: {
                  legend: {
                    data: ['月活跃度'],
                  }, 
                  xAxis: {
                    data: termMau,
                  },
                  yAxis: {},
                  series: [{
                    name: '月活跃度',
                    data: cntMau,
                  }],
                }
              },
              wau: {
                option: {
                  legend: {
                    data: ['周活跃度'],
                  }, 
                  xAxis: {
                    data: termWau,
                  },
                  yAxis: {},
                  series: [{
                    name: '周活跃度',
                    data: cntWau,
                  }],
                }
              }
            })
          }
        }
      }
    };
  }

  componentDidUpdate() {
    const aum30 = this.props.aum30;
    const aum7 = this.props.aum7;
    const mau = this.props.mau;
    const wau = this.props.wau;

    if(Array.isArray(mau) && mau.length > 0 ) {
      const aum30Chart = echarts.init(document.getElementById("aum30"));
      const aum7Chart = echarts.init(document.getElementById("aum7"));
      const mauChart = echarts.init(document.getElementById("mau"));
      const wauChart = echarts.init(document.getElementById("wau"));

      aum30Chart.setOption(this.state.aum30.option);
      aum7Chart.setOption(this.state.aum7.option);
      mauChart.setOption(this.state.mau.option);
      wauChart.setOption(this.state.wau.option);

    }
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
