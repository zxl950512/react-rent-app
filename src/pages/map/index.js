import React from 'react'
import './index.css'
import { Flex } from 'antd-mobile'
import { Icon } from 'antd-mobile'
const BMap = window.BMap
export default class Map extends React.Component {
  componentDidMount() {
    let map = new BMap.Map('container')
    let point = new BMap.Point(116.404, 39.915)
    map.centerAndZoom(point, 22)
  }

  pathChange = () => {
    console.log(this.props.history.go(-1))
  }
  render() {
    return (
      <div className="map">
        <Flex>
          <Flex.Item>
            <Icon type="left" onClick={this.pathChange} />
          </Flex.Item>
          <Flex.Item className="city-sec">地图找房</Flex.Item>
          <Flex.Item className="city-sec" />
        </Flex>
        <div id="container" />
      </div>
    )
  }
}
