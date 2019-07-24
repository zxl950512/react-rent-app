import React from 'react'
import { Flex } from 'antd-mobile'
import { Link } from 'react-router-dom'
import { PickerView } from 'antd-mobile'
import { Button } from 'antd-mobile'
import './index.css'
import { getCityCurrent } from '../../utils/index'
import axios from 'axios'
// 处理程序
import 'react-virtualized/styles.css'
// import { List } from 'react-virtualized'

class ListHouse extends React.Component {
  state = {
    citys: { label: '上海' },
    province: [],
    ways: [],
    money: [],
    filtersHouse: [],
    value: null,
    newsData: [],
    num: '1',
    isToggle: 'none',
    isShow: false,
    four: [
      { id: 1, content: '区域' },
      { id: 2, content: '方式' },
      { id: 3, content: '租金' },
      { id: 4, content: '筛选' }
    ]
  }
  closeDialog = () => {
    this.setState({
      isShow: false,
      isToggle: this.state.isShow ? 'block' : 'none'
    })
  }

  // 挂载
  async componentDidMount() {
    const res = await axios.get('http://localhost:8080/houses', {
      params: {
        cityId: getCityCurrent().id
      }
    })

    this.setState({
      citys: getCityCurrent(),
      newsData: res.data.body.list
    })
  }

  // 渲染筛选列表导航
  renderFour = () => {
    let { num, four } = this.state
    return (
      <Flex>
        {four.map((item, index) => (
          <Flex.Item key={item.id}>
            <div
              onClick={() => {
                this.dislogdis(item.id + '')
              }}
            >
              <span className={num === item.id + '' ? 'active' : ''}>
                {item.content}
              </span>
              <i
                className={`iconfont icon-arrow ${
                  num === item.id + '' ? 'active' : ''
                }`}
              />
            </div>
          </Flex.Item>
        ))}
      </Flex>
    )
  }
  // 区联动
  onChange = value => {
    console.log(value)
    this.setState({
      value
    })
  }
  onScrollChange = value => {
    console.log(value)
  }
  selectedHouse = () => {}
  dislogdis = async v => {
    const res = await axios.get('http://localhost:8080/houses/condition', {
      params: {
        id: getCityCurrent().value
      }
    })
    console.log(res.data.body)

    this.setState({
      num: v,
      province: [res.data.body.area, res.data.body.subway],
      ways: res.data.body.rentType,
      money: res.data.body.price,
      filtersHouse: [],
      isShow: true,
      isToggle: this.state.isShow ? 'block' : 'none'
    })
    //
  }

  render() {
    console.log(this.state.newsData)

    let { isToggle } = this.state
    return (
      <div className="listhouse">
        <div className="listhouse_header">
          <Flex className="search-box">
            <Flex className="search-left">
              <Link to="/citys">
                <div className="location">
                  <span id="citysChange">{this.state.citys.label}</span>
                  <i className="iconfont icon-arrow" />
                </div>
              </Link>

              <div className="search-form">
                <i className="iconfont icon-seach" />
                <span id="place">请输入小区或地址</span>
              </div>
            </Flex>
            <Link to="/map">
              {' '}
              <i className="iconfont icon-map" />
            </Link>
          </Flex>
        </div>
        {/* 区域选择 */}
        <div className="listhouse_select">{this.renderFour()}</div>
        {/* 弹框 */}
        {/* <Button>customized buttons</Button>
       
        {/* 级联选择器 */}
        <div className="citys-area" style={{ display: isToggle }}>
          <div className="four">{this.renderFour()}</div>
          <div className="listhouse_area_select">
            {/* 每一次点击时的地方显示内容不一样 */}
            {this.state.num === '1' ? (
              <PickerView
                data={this.state.province}
                value={['02', '02-1', '02-1-1']}
              />
            ) : this.state.num === '2' ? (
              <PickerView data={this.state.ways} cascade={false} />
            ) : this.state.num === '3' ? (
              <PickerView data={this.state.money} cascade={false} />
            ) : (
              <PickerView data={this.state.filtersHouse} cascade={false} />
            )}
          </div>
          <Button className="cancel">取消</Button>
          <Button className="defa" onClick={this.selectedHouse}>
            确认
          </Button>
        </div>
        <div
          className="mask"
          style={{ display: isToggle }}
          onClick={this.closeDialog}
        />

        {/* 列表数据 */}
        <div id="news">
          <ul className="filter_house">
            {this.state.newsData.map((item, index) => (
              <li key={index}>
                <div className="imgs">
                  <img src={`http://localhost:8080${item.houseImg}`} alt="" />
                </div>
                <div className="right">
                  <h3>{item.title}</h3>
                  <div className="three">{item.desc}</div>
                  <div className="transition">
                    {item.tags.map((value, index) => (
                      <span key={index}>{value}</span>
                    ))}
                  </div>
                  <div className="price">
                    <span>{item.price}</span>
                    <span>元/月</span>
                  </div>
                  <p>
                    <span>{item.from}</span>
                    <span>{item.date} </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default ListHouse
