import React, {Component} from 'react';
import P from 'prop-types';
import loadjs from '~/common/loadjs.js';

import style from './style.less';

export default class RadarChart extends Component {
  static propTypes = {
      data: P.arrayOf(P.any),
      dimension: P.string,
  };

  static defaultProps = {
      type: 1,
      data: [{
          title: '学习能力',
          val1: 4,
          val2: 23,
          max: 50,
      }, {
          title: '学习技巧',
          val1: 32,
          val2: 23,
          max: 50,
      }, {
          title: '学习心得',
          val1: 42,
          val2: 23,
          max: 50,
      }, {
          title: '学习心得2',
          val1: 22,
          val2: 23,
          max: 50,
      }, {
          title: '学习心得3',
          val1: 42,
          val2: 23,
          max: 50,
      }],
      dimension: '得分',
  };

  async componentDidMount() {
      const Echarts = await loadjs('lib/echarts.js', 'echarts');
      const radarChart = Echarts.init(this.ele);
      const {dimension, data} = this.props;
      radarChart.setOption({
          title: {
              text: '报告分析1',
          },
          tooltip: {},
          color: ['#427AFF', '#FFB740'],
          legend: {
              show: false,
              data: [{
                  name: dimension,
                  textStyle: {
                      color: '#427AFF',
                  },
              }],
              right: 'auto',
              bottom: '5%',
              itemHeight: 14,
              itemWidth: 14,
              textStyle: {
                  fontSize: 14,
                  fontWeight: 500,
              },
          },
          radar: [
              {
                  indicator: data.map(item => ({
                      text: item.title,
                      max: 100,
                  })),
                  // center: ['25%', '40%'],
                  radius: 100,
                  name: {
                      rich: {
                          b: {
                              fontSize: 12,
                              color: '#59CC4A',
                          },
                      },
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: '#333',
                  },
                  splitArea: {
                      areaStyle: {
                          color: 'white',
                          // shadowColor: 'rgba(0, 0, 0, 0.3)',
                          // shadowBlur: 10,
                      },
                  },
              },
          ],
          series: [{
              type: 'radar',
              tooltip: {
                  trigger: 'item',
              },
              data: [
                  {
                      value: data.map(item => item.val1),
                      name: dimension,
                      symbol: 'none',
                      lineStyle: {
                          normal: {
                              color: '#427AFF',
                              width: 1,
                          },
                      },
                      label: {
                          normal: {
                              show: true,
                              fontSize: 12,
                          },
                      },
                  },
              ],
          }],
      });
  }

  render() {
      return (
          <section className={style.radarChart}>
              <div className={style.chart} ref={e => { this.ele = e; }} />
          </section>
      );
  }
}
