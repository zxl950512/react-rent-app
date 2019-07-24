import React from 'react'
import { TabBar } from 'antd-mobile'
import { Carousel } from 'antd-mobile'
import { Link } from 'react-router-dom'
import './index.css'
import nav1 from '../../assets/img/nav-1.png'
import nav2 from '../../assets/img/nav-2.png'
import nav3 from '../../assets/img/nav-3.png'
import nav4 from '../../assets/img/nav-4.png'
import axios from 'axios'
import { Flex } from 'antd-mobile'

import { getBDapi } from '../../utils/citys'
class Home extends React.Component {
  state = {
    areaMess: [],
    citys: { label: '上海' },
    newsData: [],
    swiper: '',
    // 轮播图数据
    data: [],
    dats: [{}, {}, {}, {}],
    // 设置图片高度
    imgHeight: 176,
    cityName: '上海',
    // 数据导航
    TABBARLIST: [
      { title: '整租', icon: nav1, path: '/index/list' },
      { title: '合租', icon: nav2, path: '/index/list' },
      { title: '地图找房', icon: nav3, path: '/map' },
      { title: '去出租', icon: nav4, path: '/rent/add' }
    ]
  }

  // 渲染导航
  renderTabBarList = () => {
    return this.state.TABBARLIST.map(item => (
      <TabBar.Item
        icon={<img src={item.icon} alt="" style={{ width: 48, height: 48 }} />}
        selectedIcon={<i className={`iconfont ${item.icon}`} />}
        title={item.title}
        style={{ color: '#000' }}
        key={item.title}
        selected={this.state.selectedTab === item.path}
        unselectedTintColor="#000"
        onPress={() => {
          // this.props.history.push(this.state.path)
          this.setState(
            {
              selectedTab: item.path
            },
            () => {
              this.props.history.push(item.path)
            }
          )
        }}
      />
    ))
  }
  // 挂载的生命周期
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position)
    })
    this.setState({
      swiper: (window.innerWidth / 100) * 53.33
    })
    axios({
      url: 'http://localhost:8080/home/swiper'
    }).then(res => {
      setTimeout(() => {
        this.setState({
          data: res.data.body
        })
      }, 100)
    })
    axios({
      url: 'http://localhost:8080/home/groups?area=AREA%7C88cff55c-aaa4-e2e0'
    }).then(res => {
      this.setState({
        areaMess: res.data.body
      })
    })

    axios({
      url: 'http://localhost:8080/home/news?area=AREA%7C88cff55c-aaa4-e2e0'
    }).then(res => {
      this.setState({
        newsData: res.data.body
      })
    })
    // 百度地图
    // navigator.geolocation.getCurrentPosition(position => {
    //   // postion 对象中，常用属性的文档：
    //   // https://developer.mozilla.org/zh-CN/docs/Web/API/Coordinates
    //   console.log('当前位置信息：', position)
    // })
    // const BMap = window.BMap
    getBDapi()
  }
  render() {
    return (
      <div className="homebox">
        {/* 轮播图  autoplay：指定是否自动播放   infinite：是否循环播放（不设置表示ture）
         */}
        {/* className={this.state.data.length ? '' : 'swiper'} style={{height:}}*/}
        <div
          style={{ height: this.state.data.length ? '' : this.state.swiper }}
        >
          {this.state.data.length ? (
            <Carousel
              autoplay={true}
              infinite
              dotStyle={{ backgroundColor: 'orange' }}
              dotActiveStyle={{ backgroundColor: 'red' }}
            >
              {this.state.data.map(val => (
                <a
                  key={val}
                  href="http://www.alipay.com"
                  style={{
                    display: 'inline-block',
                    width: '100%',
                    height: this.state.imgHeight
                  }}
                >
                  {/* onLoad 是图片加载成功的能触发事件
              
              onError在图片加载失败是的触发事件
              */}
                  <img
                    id="img"
                    src={`http://localhost:8080${val.imgSrc}`}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                      // fire window resize event to change height
                      // 根据窗口的大小自动改变图片的大小
                      window.dispatchEvent(new Event('resize'))
                      this.setState({
                        imgHeight: 'auto'
                      })
                    }}
                  />
                </a>
              ))}
            </Carousel>
          ) : null}

          <Flex className="search-box">
            <Flex className="search-left">
              <Link to="/citys">
                <div className="location">
                  <span id="citysChange">{this.state.cityName}</span>
                  <i className="iconfont icon-arrow" />
                </div>
              </Link>

              <div className="search-form">
                <i className="iconfont icon-seach" />
                <span>请输入小区或地址</span>
              </div>
            </Flex>
            <Link to="/map">
              {' '}
              <i className="iconfont icon-map" />
            </Link>
          </Flex>
        </div>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#21B97A"
          barTintColor="white"
          tabBarPosition="bottom"
        >
          {/*  */}
          {this.renderTabBarList()}
        </TabBar>

        <div id="more">
          <Flex className="center_all">
            <Flex.Item className="left">
              <a href="##">租房小组</a>
            </Flex.Item>
            <Flex.Item className="right">
              <p>更多</p>
            </Flex.Item>
          </Flex>
        </div>
        <div className="group">
          <ul>
            {this.state.areaMess.map(item => (
              <li
                key={item.id}
                onClick={() => {
                  this.selectTop(item.id)
                }}
              >
                <div className="left" style={{ flex: 6 }}>
                  <p>{item.title}</p>
                  <p>{item.desc}</p>
                </div>
                <div className="right" style={{ flex: 4 }}>
                  <img
                    src={`http://localhost:8080${item.imgSrc}`}
                    alt=""
                    style={{ width: 55 }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="news" id="news ">
          <div className="title">最新资讯</div>
          <ul className="new-house">
            {this.state.newsData.map(item => (
              <li key={item.id}>
                <div className="imgs">
                  <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
                </div>
                <div className="right">
                  <h3>{item.title}</h3>
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

export default Home
