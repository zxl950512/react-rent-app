import React from 'react'
import { Flex } from 'antd-mobile'
import { Icon } from 'antd-mobile'
import axios from 'axios'
import './citys.css'

class Citys extends React.Component {
  state = {
    List: [],
    selec: {},
    curid: 0,
    labe: [
      '#',
      '热',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z'
    ],

    //页面滚动监听事件
    codeType: true,
    num: 0
  }

  // 锚点定位
  ChangCity = id => {
    this.setState(
      {
        curid: id
      },
      () => {
        let anchorElement = document.getElementById('active')
        console.log(anchorElement)

        if (anchorElement) {
          anchorElement.scrollIntoView(10)
        }
      }
    )
    console.log(id)
  }
  // 定位
  selecCity = name => {
    console.log(name)
    this.setState(
      {
        selec: { label: name }
      },
      () => {
        this.props.history.go(-1)
      }
    )
  }
  // 选择城市跳转
  pathChange = () => {
    this.props.history.go(-1)
  }
  componentDidUpdate() {
    localStorage.setItem('select', JSON.stringify(this.state.selec))
  }
  async componentDidMount() {
    this.setState({
      selec: JSON.parse(localStorage.getItem('select'))
    })
    let res = await axios({
      url: 'http://localhost:8080/area/city?level=1'
    })

    let hot = await axios({
      url: 'http://localhost:8080/area/hot'
    })

    this.state.labe.forEach((v, i) => {
      if (i === 0) {
        this.setState({
          List: [{ '0': [JSON.parse(localStorage.getItem('select'))] }]
        })
      } else if (i === 1) {
        this.setState({
          List: [...this.state.List, { '1': hot.data.body }]
        })
      } else {
        this.setState({
          List: [
            ...this.state.List,
            {
              [i]:
                res.data.body.filter(
                  item =>
                    item.short.slice(0, 1) ===
                    this.state.labe[i].toLocaleLowerCase()
                ).length &&
                res.data.body.filter(
                  item =>
                    item.short.slice(0, 1) ===
                    this.state.labe[i].toLocaleLowerCase()
                )
            }
          ]
        })
      }
    })

    // // 页面监听
    // window.addEventListener('scroll', this.bindScroll)
  }

  // 监听页面滚动
  componentWillUnmount() {
    // 移除滚动监听
    window.removeEventListener('scroll', this.bindScroll)
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
          <ul>
            {this.state.List.map((item, i) => (
              <li
                key={this.state.labe[i]}
                id={this.state.curid === i ? 'active' : ''}
              >
                <p>
                  {item[i] === 0
                    ? null
                    : i === 0
                    ? '当前定位'
                    : this.state.labe[i]}
                </p>

                {item[i].length &&
                  item[i].map((v, index) => (
                    <a
                      href="##"
                      key={v.value + index}
                      onClick={() => {
                        this.selecCity(v.label)
                      }}
                    >
                      {v.label}
                    </a>
                  ))}
              </li>
            ))}
          </ul>
        </div>
        <div className="list-labe">
          <ul>
            {this.state.List.map((item, i) =>
              item[i].length ? (
                <li
                  className={this.state.curid === i ? 'active' : ''}
                  key={i}
                  onClick={() => {
                    this.ChangCity(i)
                  }}
                >
                  {this.state.labe[i]}
                </li>
              ) : null
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default Citys
