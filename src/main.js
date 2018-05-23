import { Observable } from 'rxjs/Observable'
// import 'rxjs/add/observable/from'
import 'rxjs/add/observable/fromEvent'
// import 'rxjs/add/operator/throttleTime'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/bufferCount'
import 'rxjs/add/operator/filter'

const menu = document.getElementById('menu')
const menuLIs = Array.from(menu.getElementsByTagName('li'))
const subMenu = document.getElementById('sub-menu')
const subMenuLIs = Array.from(subMenu.getElementsByTagName('li'))
const container = document.querySelector('.container')

// 存储鼠标移动时的坐标
let mouseLocs = []
// container 右上角和右下角坐标
const menuTopRight = { x: menu.offsetWidth, y: 0 }
const menuBottomRight = { x: menu.offsetWidth, y: menu.offsetHeight }
menuLIs.forEach((item, index) => { item.index = index })

Observable.fromEvent(menu, 'mouseover')
  .subscribe(e => handleToggleTabs(e))
Observable.fromEvent(menu, 'mousemove')
  .map(event => ({ x: event.clientX - container.offsetLeft, y: event.clientY - container.offsetTop }))
  .bufferCount(3)
  .subscribe(data => { mouseLocs = data })
Observable.fromEvent(menu, 'mouseout')
  .filter(e => e.target.nodeName.toUpperCase() === 'LI')
  .filter(e => e.target.timeouter)
  .subscribe(e => clearTimeout(e.target.timeouter))
Observable.fromEvent(subMenu, 'mouseenter')
  .subscribe(() => { mouseLocs = [] })

function handleToggleTabs (e) {
  if (e.target.nodeName.toUpperCase() === 'LI') {
    let currentMenu = e.target
    let isInTriRange

    // subMenu 添加 show-block 类，让其显示
    subMenu.className = 'sub-menu show-block'

    // 设置一个定时器
    currentMenu.timeouter = null

    try {
      isInTriRange = isTriangleRange(mouseLocs[0], mouseLocs[2], menuTopRight, menuBottomRight)
    } catch (err) {

    }

    // 结果为 true，说明在三角区域内
    if (isInTriRange) {
      console.log('isInTriangle')
      currentMenu.timeouter = setTimeout(function () {
        toggle(subMenuLIs, currentMenu.index)
      }, 3000)
    } else {
      toggle(subMenuLIs, currentMenu.index)
    }
  }
}


/**
 * 切换选项卡和内容样式
 * @param eleArr subMenuLIs
 * @param id 当前选择的选项卡 ID
 */
function toggle (eleArr, id) {
  eleArr.forEach((item, index) => {
    menuLIs[index].className = ''
    item.className = ''
  })
  menuLIs[id].className = 'active-menu'
  eleArr[id].className = 'show-block'
}

/**
 * 计算三角形区域的方法
 * @param t1 开始鼠标坐标位置
 * @param t2 结束时鼠标坐标位置
 * @param p1 container 右上角坐标
 * @param p2 container 右下角坐标
 * @returns {boolean}
 */
function isTriangleRange (t1, t2, p1, p2) {
  const x = t2.x
  const y = t2.y

  const x1 = t1.x
  const y1 = t1.y

  const x2 = p1.x
  const y2 = p1.y

  const x3 = p2.x
  const y3 = p2.y

  /**
   * (y2 - y1) / (x2 - x1)为两坐标连成直线的斜率
   * 因为直线的公式为 y=kx+b;
   * 当斜率相同时，只要比较 b1 和 b2 的差值就可以知道该点是在(x1,y1),(x2,y2)的直线的哪个方向,
   * 当r1大于0，说明该点在直线右侧，其它以此类推
   */
  const r1 = y - y1 - (y2 - y1) / (x2 - x1) * (x - x1)
  const r2 = y - y2 - (y3 - y2) / (x3 - x2) * (x - x2)
  const r3 = y - y3 - (y1 - y3) / (x1 - x3) * (x - x3)
  console.log('r1:' + r1)
  console.log('r3:' + r3)
  return (r1 * r2 * r3 < 0) && (r1 > 0)
}
