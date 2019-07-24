import React from 'react'
import { Flex } from 'antd-mobile'
import { Icon } from 'antd-mobile'
import axios from 'axios'
import './citys.css'
import { getBDapi } from '../../utils/citys'
import { setCityCurrent } from '../../utils/index'
// 导入长列表react-virtualized
import 'react-virtualized/styles.css'
import { List } from 'react-virtualized'
class Citys extends React.Component {
  state = {
    cityListData: {},
    cityListIndex: [],
    cityName: '',
    active: 0
    // 数据
  }
  //

  // 动态计算行高

  // 回退事件
  pathChange = () => {
    this.props.history.go(-1)
  }
  // 挂载周期

  componentDidMount() {
    this.getCityList()
  }
  // 获取所有城市数据列表

  getCityList = async () => {
    const res = await axios.get('http://localhost:8080/area/city?level=1')
    //获取数据的cityListData
    let { cityListIndex, cityListData } = this.state

    res.data.body.forEach(element => {
      let alphabet = element.short[0]
      if (alphabet in cityListData) {
        cityListData[alphabet].push(element)
      } else {
        cityListData[alphabet] = [element]
      }
    })
    cityListIndex = Object.keys(cityListData).sort()
    //获取数据的cityListIndex

    // 热门城市的数据获取
    const hot = await axios.get('http://localhost:8080/area/hot')
    cityListData['hot'] = hot.data.body
    cityListIndex.unshift('hot')
    // 定位城市的数据获取
    await getBDapi().then(res => {
      cityListData['#'] = [res]
      cityListIndex.unshift('#')
    })
    this.setState({
      cityListData,
      cityListIndex
    })
  }

  //  渲染数据 到页面
  forMater = value => {
    switch (value) {
      case '#':
        return '当前定位'
      case 'hot':
        return '热门城市'
      default:
        return value.toUpperCase()
    }
  }
  rowRenderer = ({ key, index, style }) => {
    let { cityListIndex, cityListData } = this.state
    const letter = cityListIndex[index]
    const list = cityListData[letter]
    return (
      <div key={key} style={style} className="city">
        <div className="title">{this.forMater(cityListIndex[index])}</div>
        {list.map((item, index) => (
          <div
            className="name"
            key={item.value}
            onClick={() => {
              this.changePage(item, index)
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    )
  }

  // 页面跳转
  changePage = (v, index) => {
    let { cityListIndex, cityListData } = this.state
    const letter = cityListIndex[index]
    this.setCityCurrent(v)
    this.props.history.go(-1)
  }

  rowHeightComputed = ({ index }) => {
    let { cityListIndex, cityListData } = this.state
    const letter = cityListIndex[index]
    const numberHeight = 36 + 50 * cityListData[letter].length

    return numberHeight
  }

  forMaterIndex = index => {
    switch (index) {
      case '#':
        return '#'
      case 'hot':
        return '热'
      default:
        return index.toUpperCase()
    }
  }

  onRowsRendered = ({ startIndex }) => {
    console.log(startIndex)

    if (this.state.active !== startIndex) {
      this.setState({
        active: startIndex
      })
    }
    // if (stopIndex === this.state.cityListIndex.length - 1) {
    //   this.setState({
    //     active: stopIndex
    //   })
    // }
  }
  selecIndex = v => {
    console.log(v)
    this.setState({
      active: v
    })
  }

  render() {
    return (
      <div className="citys_hkzf">
        <Flex>
          <Flex.Item>
            <Icon type="left" onClick={this.pathChange} />
          </Flex.Item>
          <Flex.Item className="city-sec">城市选择</Flex.Item>
          <Flex.Item className="city-sec" />
        </Flex>
        <div className="cityrender">
          <List
            height={window.innerHeight - 45}
            width={window.innerWidth}
            className="citylist_section"
            rowCount={this.state.cityListIndex.length}
            rowHeight={this.rowHeightComputed}
            rowRenderer={this.rowRenderer}
            scrollToAlignment="start"
            onRowsRendered={this.onRowsRendered}
          />
        </div>
        <div className="aside">
          <ul>
            {this.state.cityListIndex.map((item, index) => (
              <li
                key={item}
                onClick={() => {
                  this.selecIndex(index)
                }}
              >
                <span
                  className={this.state.active === index ? 'select_active' : ''}
                >
                  {this.forMaterIndex(item)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Citys
