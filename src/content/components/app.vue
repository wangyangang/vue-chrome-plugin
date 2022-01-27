<template>
  <div class="content_page">
    <button @click="refreshAll">all</button>
    <br>
    <button @click="refreshPast(2)">2-1.75</button>
    <button @click="refreshPast(1.75)">1.75-1.5</button>
    <button @click="refreshPast(1.5)">1.5-1.25</button>
    <button @click="refreshPast(1.25)">1.25-1</button>
    <br>
    <button @click="refreshPast(1)">1-0.75</button>
    <button @click="refreshPast(0.75)">0.75-0.5</button>
    <button @click="refreshPast(0.5)">0.5-0.25</button>
    <button @click="refreshPast(0.25)">0.25</button>
    <br>
    <hr>
    <button @click="refreshFuture(0.25)">+0.25</button>
    <button @click="refreshFuture(0.5)">0.25-0.5</button>
    <button @click="refreshFuture(0.75)">0.5-0.75</button>
    <button @click="refreshFuture(1)">0.75-1</button>
    <br>
    <button @click="refreshFuture(1.25)">1-1.25</button>
    <button @click="refreshFuture(1.5)">1.25-1.5</button>
    <button @click="refreshFuture(1.75)">1.5-1.75</button>
    <button @click="refreshFuture(2)">1.75-2</button>
    <br>
    <button @click="refreshFuture(2.25)">2-2.25</button>
    <button @click="refreshFuture(2.5)">2.25-2.5</button>
    <button @click="refreshFuture(2.75)">2.5-2.75</button>
    <button @click="refreshFuture(3)">2.75-3</button>
    <br>
    <button @click="refreshFuture(3.25)">3-3.25</button>
    <button @click="refreshFuture(3.5)">3.25-3.5</button>
    <button @click="refreshFuture(3.75)">3.5-3.75</button>
    <button @click="refreshFuture(4)">3.75-4</button>
    <br>
    <button @click="refreshFuture(4.25)">4-4.25</button>
    <button @click="refreshFuture(4.5)">4.25-4.5</button>
    <button @click="refreshFuture(4.75)">4.5-4.75</button>
    <button @click="refreshFuture(5)">4.75-5</button>
    <br>
    <button @click="refreshFuture(5.25)">5-5.25</button>
    <button @click="refreshFuture(5.5)">5.25-5.5</button>
    <button @click="refreshFuture(5.75)">5.5-5.75</button>
    <button @click="refreshFuture(6)">5.75-6</button>
    <br>
    <button @click="refreshFuture(6.25)">6-6.25</button>
    <button @click="refreshFuture(6.5)">6.25-6.5</button>
    <button @click="refreshFuture(6.75)">6.5-6.75</button>
    <button @click="refreshFuture(7)">6.75-7</button>
    <br>
    <button @click="refreshFuture(7.25)">7-7.25</button>
    <button @click="refreshFuture(7.5)">7.25-7.5</button>
    <button @click="refreshFuture(7.75)">7.5-7.75</button>
    <button @click="refreshFuture(8)">7.75-8</button>
    <br>
    <button @click="refreshFuture(8.25)">8-8.25</button>
    <button @click="refreshFuture(8.5)">8.25-8.5</button>
    <button @click="refreshFuture(8.75)">8.5-8.75</button>
    <button @click="refreshFuture(9)">8.75-9</button>
    <br>
    <button @click="refreshFuture(9.25)">9-9.25</button>
    <button @click="refreshFuture(9.5)">9.25-9.5</button>
    <button @click="refreshFuture(9.75)">9.5-9.75</button>
    <button @click="refreshFuture(10)">9.75-10</button>
    <div class="content_page_main">
      content_page_main
    </div>
  </div>
</template>

<script>
// import axios from "axios"
import cheerio from "cheerio";
import $ from "jquery"

export default {
  data() {
    return {
      isFirst: true,
      rows: null
    }
  },
  methods: {
    latestHalfHour() {
      let now = new Date()
      now.setTime(now.getTime() - 30 * 60 * 1000)
      return now
    },
    latestOneHour() {
      let now = new Date()
      now.setTime(now.getTime() - 60 * 60 * 1000)
      return now
    },
    getFutureTime(h){
      let now = new Date()
      let now2 = new Date()
      now.setTime(now.getTime() + h * 60 * 60 * 1000)
      now2.setTime(now2.getTime() + (h-0.25) * 60 * 60 * 1000)
      return {"now": now, "now2": now2}
    },
    getPastTime(h){
      let now = new Date()
      let now2 = new Date()
      now.setTime(now.getTime() - h * 60 * 60 * 1000)
      now2.setTime(now2.getTime() - (h-0.25) * 60 * 60 * 1000)
      return {"now": now, "now2": now2}
    },
    sortRows(table, comparator) {
      let tbody = table.tBodies[0];
      let rows = tbody.getElementsByTagName("tr");
      rows = Array.prototype.slice.call(rows, 0);//ת��Ϊ��ʵ����
      //���ڵ�n��<td>Ԫ�ص�ֵ��������
      rows.sort(function (row1, row2) {
        let cell1 = row1.getElementsByTagName("td")[row1.cells.length - 1];
        let cell2 = row2.getElementsByTagName("td")[row2.cells.length - 1];
        // console.log(cell1);
        // console.log(cell2);
        if (cell1 !== undefined && cell2 !== undefined) {
          let val1 = cell1.textContent || cell1.innerText;//IE����
          let val2 = cell2.textContent || cell2.innerText;
          if (comparator) return comparator(val1, val2);

          if (val1 !== "" && val2 !== "") {
            if (val1 < val2 && val1) return -1;
            else if (val1 > val2) return 1;
            else return 0;
          } else if (val1 === '' && val2 !== "") {
            return 1
          } else if (val1 !== '' && val2 === '') {
            return -1
          } else {
            return 0
          }

        } else if (cell1 !== undefined && cell2 === undefined) {
          return -1
        } else if (cell1 === undefined && cell2 !== undefined) {
          return 1
        } else {
          return 0;
        }
      });
      for (let i = 0; i < rows.length; i++) tbody.appendChild(rows[i]);  //ԭ�ȵĻ��Զ��Ƴ�
    },
    // getData(url){
    //   axios.get(url).then((resp)=>{
    //     let $ = cheerio.load(resp.data, {decodeEntities: false})
    //     let tables = $("table.gts")
    //     let table1 = tables.eq(0)
    //     let rows = table1.find("tr")
    //     console.log(rows)
    //     return rows
    //   }).catch((err=>{
    //     console.log(err)
    //     return null
    //   }))
    // },
    // async getData(url){
    //   try {
    //     return await axios.get(url);
    //   }catch (err){
    //     console.log(err)
    //     return null
    //   }
    // },
    getDataSync(url) {
      let ret = '1'
      $.ajax(url, {
        type: "get",
        async: false,
        headers: {},
        success: function (resp) {
          ret = resp
          console.log(url, ret)
        },
        error: function (err) {
          console.log(err)
          ret = 'err'
        }
      })
      return ret
    },

    group(data) {
      let ret = "begin";
      let ret2 = 'begin';
      let $ = cheerio.load(data, {decodeEntities: false})
      let tables = $("table.gts")
      let table1 = tables.eq(0)
      let table2 = tables.eq(1)
      // let rows = table1.find("tr")
      let redRows = table1.find("tr td[class='hg_red']")
      let redRows2 = table2.find("tr td[class='hg_red']")
      if (redRows && redRows.length !== 0) {
        if (redRows.length === 1) {
          ret = "H"
        } else {
          let beginRow = redRows.eq(redRows.length - 1)
          let _beginHost = beginRow.prev().prev().prev().prev().clone().children().remove().end().text()
          let _beginPoint = beginRow.prev().prev().prev().clone().children().remove().end().text()
          let _beginCustomer = beginRow.prev().prev().clone().children().remove().end().text()
          console.log('begin: ', _beginHost, _beginPoint, _beginCustomer)

          // 1 平  2 上盘 3 下盘 4 水位相等
          let begin = -1
          // 平盘
          if (_beginPoint.indexOf("平手") !== -1) {
            begin = 1
          }
          // 不是平盘
          if (begin !== 1) {
            if (_beginPoint.indexOf('受') === -1) { // 没有受，说明左边厉害
              if (parseFloat(_beginHost) < parseFloat(_beginCustomer)) {
                begin = 2
              } else if (parseFloat(_beginHost) > parseFloat(_beginCustomer)) {
                begin = 3
              } else {
                begin = 4
              }
            } else { // 右边厉害
              if (parseFloat(_beginHost) > parseFloat(_beginCustomer)) {
                begin = 2
              } else if (parseFloat(_beginHost) < parseFloat(_beginCustomer)) {
                begin = 3
              } else {
                begin = 4
              }
            }
          }

          // 即时盘
          let endRow = redRows.eq(0)

          let _endHost = endRow.prev().prev().prev().prev().clone().children().remove().end().text()
          let _endCondition = endRow.prev().prev().prev().clone().children().remove().end().text()
          let _endCustomer = endRow.prev().prev().clone().children().remove().end().text()
          console.log('end: ', _endHost, _endCondition, _endCustomer)
          // 判断即时盘的盘口
          let end = -1
          //
          if (_endCondition.indexOf("平手") !== -1) {
            end = 1
          }
          // 即时盘不是平盘
          if (end !== 1) {
            if (_endCondition.indexOf('受') === -1) { // 没有受说明左边
              if (parseFloat(_endHost) < parseFloat(_endCustomer)) {
                end = 2
              } else if (parseFloat(_endHost) > parseFloat(_endCustomer)) {
                end = 3
              } else {
                end = 4
              }
            } else {
              if (parseFloat(_endHost) > parseFloat(_endCustomer)) {
                end = 2
              } else if (parseFloat(_endHost) < parseFloat(_endCustomer)) {
                end = 3
              } else {
                end = 4
              }
            }
          }
          console.log(begin, end)
          if (begin === 2 && end === 2) {
            let blueRows = table1.find("tr td[class='hg_blue']")
            if (blueRows && blueRows.length !== 0) {
              let endBlueRow = blueRows.eq(0)
              let _endBluePoint = endBlueRow.prev().prev().prev().prev().prev().clone().children().remove().end().text()
              let leftPoint = _endBluePoint.split('-')[0]
              let rightPoint = _endBluePoint.split('-')[1]
              if (_beginPoint.indexOf('受') === -1) { // 没有受，说明左边厉害
                if (parseFloat(leftPoint) > parseFloat(rightPoint)) {
                  // 厉害球队取得比分领先
                  ret = 'A1'
                } else if (parseFloat(leftPoint) < parseFloat(rightPoint)) {
                  // 不厉害球队比分领先
                  ret = 'A2'
                } else {
                  ret = 'A3'
                }
              } else { // 右边厉害
                if (parseFloat(leftPoint) < parseFloat(rightPoint)) {
                  // 厉害球队取得比分领先
                  ret = 'A1'
                } else if (parseFloat(leftPoint) > parseFloat(rightPoint)) {
                  // 不厉害球队比分领先
                  ret = 'A2'
                } else {
                  ret = 'A3'
                }
              }
            } else {
              ret = 'A'
            }
          } else if (begin === 3 && end === 3) { // 初盘下盘，即时盘下盘
            let blueRows = table1.find("tr td[class='hg_blue']")
            if (blueRows && blueRows.length !== 0) {
              let endBlueRow = blueRows.eq(0)
              let _endBluePoint = endBlueRow.prev().prev().prev().prev().prev().clone().children().remove().end().text()
              let leftPoint = _endBluePoint.split('-')[0]
              let rightPoint = _endBluePoint.split('-')[1]
              if (_beginPoint.indexOf('受') === -1) { // 没有受，说明左边厉害
                if (parseFloat(leftPoint) > parseFloat(rightPoint)) {
                  // 厉害球队取得比分领先
                  ret = 'B1'
                } else if (parseFloat(leftPoint) < parseFloat(rightPoint)) {
                  // 不厉害球队比分领先
                  ret = 'B2'
                } else {
                  ret = 'B3'
                }
              } else { // 右边厉害
                if (parseFloat(leftPoint) < parseFloat(rightPoint)) {
                  // 厉害球队取得比分领先
                  ret = 'B1'
                } else if (parseFloat(leftPoint) > parseFloat(rightPoint)) {
                  // 不厉害球队比分领先
                  ret = 'B2'
                } else {
                  ret = 'B3'
                }
              }
            } else {
              ret = 'B'
            }
          } else if (begin === 2 && end === 3) {
            ret = "C"
          } else if (begin === 3 && end === 2) {
            ret = "D"
          } else if (begin === 1 && end === 1) {
            ret = "E1"
          } else if (begin === 1 && end !== 1) {
            if (_endCondition.indexOf('平/半') !== -1 && end === 2) {
              ret = 'E2'
            } else if (_endCondition.indexOf('平/半') !== -1 && end === 3) {
              ret = 'E3'
            } else if (_endCondition.indexOf('平球') !== -1 && end === 2) {
              ret = 'E4'
            } else if (_endCondition.indexOf('平球') !== -1 && end === 3) {
              ret = 'E5'
            } else if (_endCondition.indexOf('半/一') !== -1 && end === 2) {
              ret = 'E6'
            } else if (_endCondition.indexOf('半/一') !== -1 && end === 3) {
              ret = 'E7'
            } else {
              ret = 'E8'
            }
          } else if (begin !== 1 && end === 1) {
            ret = 'F'
          } else if (begin === 4 && end === 2) {
            ret = 'G1'
          } else if (begin === 4 && end === 3) {
            ret = 'G2'
          } else if (begin === 4 && end === 4) {
            ret = 'G3'
          } else {
            ret = 'other'
          }
        }
      } else {
        ret = 'error'
      }

      // 判断大小球分类
      if (redRows2 && redRows2.length !== 0) {
        let beginRow2 = redRows2.eq(redRows2.length - 1)
        let _beginLeft = beginRow2.prev().prev().prev().prev().clone().children().remove().end().text()
        let _beginRight = beginRow2.prev().prev().clone().children().remove().end().text()
        let begin = -1;
        // 左边低 1， 最开始右边低 2， 最开始相等3
        //
        if (parseFloat(_beginLeft) < parseFloat(_beginRight)) {
          begin = 1
        } else if (parseFloat(_beginLeft) > parseFloat(_beginRight)) {
          begin = 2
        } else {
          begin = 3
        }
        if (redRows2.length === 1) {
          if (begin === 1) {
            ret2 = 'Z3'
          } else if (begin === 2) {
            ret2 = 'Z1'
          } else {
            ret2 = 'ZD'
          }
        } else {
          // 判断大小球结束
          let endRow2 = redRows2.eq(0)
          let _endLeft = endRow2.prev().prev().prev().prev().clone().children().remove().end().text()
          let _endRight = endRow2.prev().prev().clone().children().remove().end().text()
          let end = -1;
          // 左边低 1， 最开始右边低 2， 最开始相等3
          //
          if (parseFloat(_endLeft) < parseFloat(_endRight)) {
            end = 1
          } else if (parseFloat(_endLeft) > parseFloat(_endRight)) {
            end = 2
          } else {
            end = 3
          }

          console.log('begin: ', _beginLeft, _beginRight)
          if (redRows2.length === 2) {
            if (begin === 2 && end === 2) {
              ret2 = 'W1'
            } else if (begin === 2 && end === 3) {
              ret2 = 'W2'
            } else if (begin === 2 && end === 1) {
              ret2 = 'W3'
            } else if (begin === 3 && end === 2) {
              ret2 = 'W4'
            } else if (begin === 3 && end === 3) {
              ret2 = 'W5'
            } else if (begin === 3 && end === 1) {
              ret2 = 'W6'
            } else if (begin === 1 && end === 1) {
              ret2 = 'W7'
            } else if (begin === 1 && end === 3) {
              ret2 = 'W8'
            } else if (begin === 1 && end === 2) {
              ret2 = 'W9'
            }
          } else {
            // 判断大小球倒数第二个
            let lastSecondRow = redRows2.eq(1)
            let _lastSecondLeft = lastSecondRow.prev().prev().prev().prev().clone().children().remove().end().text()
            let _lastSecondRight = lastSecondRow.prev().prev().clone().children().remove().end().text()
            let lastSecond = -1;
            // 左边低 1， 最开始右边低 2， 最开始相等3
            //
            if (parseFloat(_lastSecondLeft) < parseFloat(_lastSecondRight)) {
              lastSecond = 1
            } else if (parseFloat(_lastSecondLeft) > parseFloat(_lastSecondRight)) {
              lastSecond = 2
            } else {
              lastSecond = 3
            }

            if (begin === 2 && end === 2 && lastSecond === 2) {
              ret2 = 'O'
            }else if(begin === 2 && lastSecond === 3 && end === 2){
              ret2 = 'OD'
            }
            else if (begin === 2 && lastSecond === 1 && end === 2) {
              ret2 = 'P'
            } else if (begin === 1 && lastSecond === 1 && end === 1) {
              ret2 = 'M'
            }else if(begin === 1 && lastSecond === 3 && end === 1){
              ret2 = 'MD'
            }
            else if (begin === 1 && lastSecond === 2 && end === 1) {
              ret2 = 'N'
            } else if (begin === 2 && end === 1) {
              ret2 = 'S'
            } else if (begin === 1 && end === 2) {
              ret2 = 'T'
            } else if (begin === 3 && end === 2) {
              ret2 = 'X1'
            } else if (begin === 3 && end === 3) {
              ret2 = 'XD'
            } else if (begin === 3 && end === 1) {
              ret2 = 'X3'
            } else if (begin === 2 && end === 3) {
              ret2 = 'Y1'
            } else if (begin === 1 && end === 3) {
              ret2 = 'Y3'
            }
          }
        }
      } else {
        ret2 = 'U'
      }
      return [ret, ret2]
    },
    refreshAll() {
      console.time("refresh")

      let tableLive = document.getElementById('table_live')
      let tbody = tableLive.tBodies[0]
      let rows = tbody.getElementsByTagName('tr')
      console.log(rows.length);
      //rows = Array.prototype.slice.call(rows, 0)
      let count = 0
      for (let i = 0; i < rows.length; i++) {
        // 从上一个整半点开始到现在的进行中的比赛进行分类并排序
        let rowID = rows[i].getAttribute("id")

        if (rowID.substring(0, 4) === 'tr1_') {

          if (rows[i].getAttribute("ifshow") !== "0" || rows[i].getAttribute("ifshow") === null) {
            let beginTime = rows[i].getElementsByTagName('td')[2].innerHTML
            //let
            Math.floor(parseInt(beginTime.substring(3,)) / 30)

            count += 1;
            rowID = rowID.substring(4)
            //let url = "https://score.nowscore.com/odds/3in1Odds.aspx?companyid=8&id=" + rowID
            let url = "http://live.nowscore.com/odds/3in1Odds.aspx?companyid=8&id=" + rowID
            console.log('-------------------------')
            console.log(i + 1, rows.length, url)
            // 2. *************** ������ ***************
            let data = this.getDataSync(url)
            // 3. *************** ���� ***************
            let _group = this.group(data)[0]
            let _group2 = this.group(data)[1]
            // 4. *************** �ѷ������������һ�� ***************
            if (this.isFirst) {
              let newCell = rows[i].insertCell(rows[i].cells.length)
              newCell.innerHTML = "<td>" + _group + "</td>"
              let newCell2 = rows[i].insertCell(rows[i].cells.length)
              newCell2.innerHTML = "<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + _group2 + "</td>"
              //newCell2.innerHTML = "<a href='#'>" + _group2 + "</a>"
            } else {
              let lastCell = rows[i].cells[rows[i].cells.length - 1]
              lastCell.innerHTML = "<td>" + _group + "</td>"
              let lastCell2 = rows[i].cells[rows[i].cells.length - 1]
              lastCell2.innerHTML = "<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + _group2 + "</td>"
              //lastCell2.innerHTML = "<a href='#'>" + _group2 + "</a>"
            }
            console.log('**********************************')
            setTimeout(function () {
            }, 1000)
          }

        } else {
          // ��Ĭ�Ͻ���������һ��
          // if (this.isFirst) {
          //   let newCell = rows[i].insertCell(rows[i].cells.length)
          //   newCell.innerHTML = "<td style='color:red; word-break:keep-all;width:100px;'>F</td>"
          // } else {
          //   let lastCell = rows[i].cells[rows[i].cells.length - 1]
          //   lastCell.innerHTML = "<td style='color:red; word-break:keep-all;width:100px;'>F</td>"
          // }
        }
        // if(i===30){
        //   break
        // }
      }
      // *************** 5. �������һ������ *****************
      console.log(count);
      this.sortRows(tableLive)
      this.isFirst = false
      console.timeEnd("refresh")
    },
    refreshPast(h) {
      // 刷新最近半小时
      console.time("refresh")

      let tableLive = document.getElementById('table_live')
      let tbody = tableLive.tBodies[0]
      let rows = tbody.getElementsByTagName('tr')
      console.log(rows.length);
      //rows = Array.prototype.slice.call(rows, 0)
      let count = 0
      let ret = this.getPastTime(h)
      console.log(ret)
      let now = ret.now;
      let now2 = ret.now2;
      for (let i = 0; i < rows.length; i++) {
        // 从上一个整半点开始到现在的进行中的比赛进行分类并排序
        let rowID = rows[i].getAttribute("id")

        if (rowID.substring(0, 4) === 'tr1_') {
          if (rows[i].getAttribute("ifshow") !== "0" || rows[i].getAttribute("ifshow") === null) {
            // 判断当前row的时间是否在半小时以内
            let beginTime = rows[i].getElementsByTagName('td')[2].innerHTML
            let beginDateTimeStr = new Date().toLocaleDateString() + ' ' + beginTime + ':00'
            let beginDateTime = new Date(beginDateTimeStr)
            if(beginDateTime > Date.now()){
              beginDateTime.setDate(beginDateTime.getDate() - 1)
            }
            if (beginDateTime >= now && beginDateTime <= now2) {
              count += 1;
              rowID = rowID.substring(4)
              let url = "http://live.nowscore.com/odds/3in1Odds.aspx?companyid=8&id=" + rowID
              console.log('-------------------------')
              console.log(i + 1, rows.length, url)
              // 2. *************** ������ ***************
              let data = this.getDataSync(url)
              // 3. *************** ���� ***************
              let _group = this.group(data)[0]
              let _group2 = this.group(data)[1]
              // 4. *************** �ѷ������������һ�� ***************
              if (this.isFirst) {
                let newCell = rows[i].insertCell(rows[i].cells.length)
                newCell.innerHTML = "<td>" + _group + "</td>"
                let newCell2 = rows[i].insertCell(rows[i].cells.length)
                newCell2.innerHTML = "<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + _group2 + "</td>"
                //newCell2.innerHTML = "<a href='#'>" + _group2 + "</a>"
              } else {
                let lastCell = rows[i].cells[rows[i].cells.length - 1]
                lastCell.innerHTML = "<td>" + _group + "</td>"
                let lastCell2 = rows[i].cells[rows[i].cells.length - 1]
                lastCell2.innerHTML = "<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + _group2 + "</td>"
                //lastCell2.innerHTML = "<a href='#'>" + _group2 + "</a>"
              }
              console.log('**********************************')
              setTimeout(function () {
              }, 1000)
            }
          }
        } else {
          // ��Ĭ�Ͻ���������һ��
          // if (this.isFirst) {
          //   let newCell = rows[i].insertCell(rows[i].cells.length)
          //   newCell.innerHTML = "<td style='color:red; word-break:keep-all;width:100px;'>F</td>"
          // } else {
          //   let lastCell = rows[i].cells[rows[i].cells.length - 1]
          //   lastCell.innerHTML = "<td style='color:red; word-break:keep-all;width:100px;'>F</td>"
          // }
        }
        // if(i===30){
        //   break
        // }
      }
      // *************** 5. �������һ������ *****************
      console.log(count);
      this.sortRows(tableLive)
      this.isFirst = false
      console.timeEnd("refresh")
    },
    refreshFuture(h){
      // 刷新将来
      console.time("refresh")

      let tableLive = document.getElementById('table_live')
      let tbody = tableLive.tBodies[0]
      let rows = tbody.getElementsByTagName('tr')
      console.log(rows.length);
      //rows = Array.prototype.slice.call(rows, 0)
      let count = 0
      let ret = this.getFutureTime(h)
     
      let futureTime = ret.now;
      let futureTime2 = ret.now2; // 将来0.25小时再减去0.25小时
      console.log(futureTime, futureTime2)
      for (let i = 0; i < rows.length; i++) {
        // 从当前时间往后半小时
        let rowID = rows[i].getAttribute("id")

        if (rowID.substring(0, 4) === 'tr1_') {
          if (rows[i].getAttribute("ifshow") !== "0" || rows[i].getAttribute("ifshow") === null) {
            // 判断当前row的时间是否在半小时以内
            let beginTime = rows[i].getElementsByTagName('td')[2].innerHTML
            let beginDateTimeStr = new Date().toLocaleDateString() + ' ' + beginTime + ':00'
            let beginDateTime = new Date(beginDateTimeStr)
            if(beginDateTime < Date.now()){
              beginDateTime.setDate(beginDateTime.getDate() + 1)
            }
            if (beginDateTime <= futureTime && beginDateTime >= futureTime2) {
              count += 1;
              rowID = rowID.substring(4)
              let url = "http://live.nowscore.com/odds/3in1Odds.aspx?companyid=8&id=" + rowID
              console.log('-------------------------')
              console.log(i + 1, rows.length, url)
              // 2. *************** ������ ***************
              let data = this.getDataSync(url)
              // 3. *************** ���� ***************
              let _group = this.group(data)[0]
              let _group2 = this.group(data)[1]
              // 4. *************** �ѷ������������һ�� ***************
              if (this.isFirst) {
                let newCell = rows[i].insertCell(rows[i].cells.length)
                newCell.innerHTML = "<td>" + _group + "</td>"
                let newCell2 = rows[i].insertCell(rows[i].cells.length)
                newCell2.innerHTML = "<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + _group2 + "</td>"
                //newCell2.innerHTML = "<a href='#'>" + _group2 + "</a>"
              } else {
                let lastCell = rows[i].cells[rows[i].cells.length - 1]
                lastCell.innerHTML = "<td>" + _group + "</td>"
                let lastCell2 = rows[i].cells[rows[i].cells.length - 1]
                lastCell2.innerHTML = "<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + _group2 + "</td>"
                //lastCell2.innerHTML = "<a href='#'>" + _group2 + "</a>"
              }
              console.log('**********************************')
              setTimeout(function () {
              }, 1000)
            }
          }
        } else {
          // ��Ĭ�Ͻ���������һ��
          // if (this.isFirst) {
          //   let newCell = rows[i].insertCell(rows[i].cells.length)
          //   newCell.innerHTML = "<td style='color:red; word-break:keep-all;width:100px;'>F</td>"
          // } else {
          //   let lastCell = rows[i].cells[rows[i].cells.length - 1]
          //   lastCell.innerHTML = "<td style='color:red; word-break:keep-all;width:100px;'>F</td>"
          // }
        }
        // if(i===30){
        //   break
        // }
      }
      // *************** 5. �������һ������ *****************
      console.log(count);
      this.sortRows(tableLive)
      this.isFirst = false
      console.timeEnd("refresh")
    }
  }
}
</script>

<style lang="less" scoped>
.content_page {
  color: red;
  position: fixed;
  z-index: 100001;
  right: 10px;
  bottom: 10px;

  .content_page_main {
    color: green;
  }
}
</style>
