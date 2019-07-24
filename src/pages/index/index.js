import React from 'react'
import { TabBar } from 'antd-mobile'
import { Route } from 'react-router-dom'
import './index.css'
import Home from '../Home/index'
import List from '../ListHouse/index'
import News from '../News/index'
import Mine from '../Mine/index'
import '../../assets/fonts/iconfont.css'
// 封装数据

class Indexs extends React.Component {
  //挂在阶段的constructor
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: this.props.location.pathname,
      hidden: false,
      fullScreen: true,
      TABBARLIST: [
        { title: '首页', icon: 'icon-ind', path: '/index' },
        { title: '找房', icon: 'icon-findHouse', path: '/index/list' },
        { title: '资讯', icon: 'icon-infom', path: '/index/news' },
        { title: '我的', icon: 'icon-my', path: '/index/mine' }
      ]
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({
        selectedTab: this.props.location.pathname
      })
    }
  }

  renderTabBarList = () => {
    return this.state.TABBARLIST.map(item => (
      <TabBar.Item
        unselectedTintColor={'#000'}
        icon={<i className={`iconfont ${item.icon}`} />}
        selectedIcon={<i className={`iconfont ${item.icon}`} />}
        title={item.title}
        key={item.title}
        selected={this.state.selectedTab === item.path}
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

  render() {
    return (
      <div>
        <div className="listcenter">
          <Route exact path="/index" component={Home} />
          <Route exact path="/index/list" component={List} />
          <Route exact path="/index/news" component={News} />
          <Route exact path="/index/mine" component={Mine} />
        </div>

        <div
          style={
            this.state.fullScreen
              ? { position: 'fixed', height: 60, width: '100%', bottom: 0 }
              : { height: 400 }
          }
        >
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#21B97A"
            barTintColor="white"
            tabBarPosition="bottom"
          >
            {/*  */}
            {this.renderTabBarList()}
          </TabBar>
        </div>
      </div>
    )
  }
}

export default Indexs
