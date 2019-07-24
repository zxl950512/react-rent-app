// 创建一个内容列表组件
let data = [
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
]
var itemList = new ItemList(data)

// 创建一个索引导航组件
var indexSidebar = new IndexSidebar()

// 组合两个组件实现功能
// 监听索引导航组件，一旦索引字符更新，内容列表跳转至对应的索引字符
indexSidebar.on('charChange', function(ch) {
  itemList.gotoChar(ch)
})

function IndexSidebar(options) {
  // TODO 处理 options
  this.initialize(options)
}

IndexSidebar.prototype.initialize = function(options) {
  // TODO 初始化
}
// 特定事件触发时，调用传入的回调函数并传入事件数据
IndexSidebar.prototype.on = function(event, callback) {
  // TODO 实现事件监听
}
// 触发特定事件，并给出事件数据供监听的回调函数使用
IndexSidebar.prototype.trigger = function(event, data) {
  // TODO
}

// 解除事件监听
IndexSidebar.prototype.off = function(event, callback) {
  // TODO
}

function ItemList(data) {
  return {
    gotoChar: function(ch) {
      // TODO 实现按索引字符跳转功能
    }
  }
}

IndexSidebar.prototype.initEvents = function(options) {
  var el = this.el // el 对应导航栏容器元素，初始化过程略
  var touching = false

  el.addEventListener(
    'touchstart',
    function(e) {
      if (!touching) {
        // 取消缺省行为，否则在 iOS 环境中会出现页面上下抖动
        e.preventDefault()
        var t = e.touches[0]
        start(t.clientX, t.clientY)
      }
    },
    false
  )

  // 拖动过程中手指可能会移出导航栏，所以是在 document 上监听
  // 不过貌似在 el 上监听也可以，这个暂不讨论了
  // 后面的 touchend 也是类似的缘故
  document.addEventListener(
    'touchmove',
    function handler(e) {
      if (touching) {
        e.preventDefault()
        var t = e.touches[0]
        move(t.clientX, t.clientY)
      }
    },
    false
  )

  document.addEventListener(
    'touchend',
    function(e) {
      if (touching) {
        e.preventDefault()
        end()
      }
    },
    false
  )

  // TODO 实现索引字符的更新
  function start(clientX, clientY) {}
  function move(clientX, clientY) {}
  function end() {}
}

this.trigger('charChange', ch)

IndexSidebar.prototype.trigger = function(event, data) {
  var listeners = this._listeners && this._listeners[event]
  if (listeners) {
    listeners.forEach(function(listener) {
      listener(data)
    })
  }
}

IndexSidebar.prototype.on = function(event, callback) {
  this._listeners = this._listeners || {}
  var listeners = this._listeners[event] || (this._listeners[event] = [])
  listeners.push(callback)
}

IndexSidebar.prototype.off = function(event, callback) {
  var listeners = this._listeners && this._listeners[event]
  if (listeners) {
    var i = listeners.indexOf(callback)
    if (i > -1) {
      listeners.splice(i, 1)
      if (listeners.length === 0) {
        this._listeners[event] = null
      }
    }
  }
}
// 内容列表组件
function ItemList(data) {
  var list = []
  var map = {}
  var html

  html = data
    .map(function(item) {
      // 数组中每项为 "Angola 安哥拉" 的形式，且已排序
      var i = item.lastIndexOf(' ')
      var en = item.slice(0, i)
      var cn = item.slice(i + 1)
      var ch = en[0]
      if (map[ch]) {
        return '<li>' + en + '<br>' + cn + '</li>'
      } else {
        // 同一索引字符首次出现时，在 HTML 上标记
        map[ch] = true
        return '<li data-ch="' + ch + '">' + en + '<br>' + cn + '</li>'
      }
    })
    .join('')

  var elItemList = document.querySelector('#item-container ul')
  elItemList.innerHTML = html

  return {
    gotoChar: function(ch) {
      // TODO 实现按索引字符跳转功能
    }
  }
}
return {
  gotoChar: function(ch) {
    if (ch === '*') {
      // 滚动至顶部
      elItemList.scrollTop = 0
    } else if (ch === '#') {
      // 滚动至底部
      elItemList.scrollTop = elItemList.scrollHeight
    } else {
      // 滚动至特定索引字符处
      var target = elItemList.querySelector('[data-ch="' + ch + '"]')
      if (target) {
        target.scrollIntoView()
      }
    }
  }
}
var defaultOptions = {
  chars: '*ABCDEFGHIJKLMNOPQRSTUVWXYZ#',
  isAdjust: true, // 是否需要自动调整导航栏高度
  offsetTop: 70,
  offsetBottom: 10,
  lineScale: 0.7,
  charOffsetX: 80,
  charOffsetY: 20
}

function IndexSidebar(options) {
  options = options || {}

  // 遍历缺省选项逐一处理
  for (var k in defaultOptions) {
    if (defaultOptions.hasOwnProperty(k)) {
      // 未给出选项值时使用缺省选项值
      options[k] = options[k] || defaultOptions[k]
    }
  }

  this.options = options
  this.initialize(options)
}
;(function(factory) {
  if (typeof module === 'object' && module.export) {
    module.export = factory()
  } else if (typeof define === 'function' && (define.amd || define.cmd)) {
    define([], factory)
  } else if (typeof window !== 'undefined') {
    window.IndexSidebar = factory()
  }
})(function() {
  // ...
  return IndexSidebar
})
