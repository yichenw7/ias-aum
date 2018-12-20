import React, { PureComponent } from 'react';
import echarts from 'echarts';

import { connect } from 'react-redux';

class TrendChart extends PureComponent{
  constructor(props){
    super(props);
    this.chart = null;
    this.options={
      animation: false,
      yAxis: {
        z: 2,
        type: 'value',
        scale: true,
        boundaryGap: [0, '0.1%'],
        nameTextStyle: {
          color: '#FFEBC8',
          fontSize: 10,
          align: 'right',
        },
        axisLabel: {
          textStyle: {
            color: '#FFEBC8',
          },
          scale: true,
          axisLine: {
            show: false,
          },
        },
        splitArea: {
          show: true,
          areaStyle: {color: ['#182422', '#111A19']},
        },
        splitLine: {
          interval: 1,
          show: true,
          lineStyle: {
            color: ['#193D37'],
            width: 1,
            type: 'solid'
          }
        },
        axisTick: {
          show: false
        }
      },
      xAxis : {
        type: 'category',
        offset: 1,
        axisLabel: {
          show: true,
          fontSize: 10,
          textStyle: {
            color: '#FFEBC8',
            fontSize:10,
          },
          margin: 4,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#193D37'],
            width: 1,
            type: 'solid'
          }
        },
        splitArea: {
          show: true,
          areaStyle: {color: ['#182422', '#111A19']},
        },
        axisTick: {
          show: false,
          length: 6,
          alignWithLabel: true
        },
      },
      series: [],
    }
  }

  componentDidMount(){
    //初始化图表
    if(this.chart){
      this.chartContainer = echarts.init(this.chart);
      const options=this.props.option;
      const series=options.series;
      const axis =options.xAxis;
      this.options.xAxis.data = axis;
      this.options.series=series;
      console.log(this.options);
      this.chartContainer.setOption(this.options);
    }
  }
  componentDidUpdate() {
    //每次组件更新都重置
    this.chartContainer.setOption(this.props.option);
  }
  componentWillUnmount() {
    //组件卸载前卸载图表
    if (this.chartContainer) echarts.dispose(this.chartContainer);
  }
//刷新图标
  updateChart(data) {
    if (this.chartIns) this.chartIns.setOption(this.setOpt(data), true);
  }
  render(){
    return(
      <div
        style={{height:230}}
        ref={ref => (this.chart = ref)} />
    )
  }
}

export default TrendChart;