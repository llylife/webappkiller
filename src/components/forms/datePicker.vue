<template>
  <div class="wk-date-picker" :style="{'z-index': zIndex}">
    <div class="wk-date-monthly">
      <div class="wk-date-previous" @click="nextMonth('pre')">
        <i class="icon icon-keyboard_arrow_left"></i>
      </div>
      <div class="wk-date-caption">
        <a class="date-year" @click="showYear"><small>{{checked.year}}</small></a>
        <a class="date-month" @click="showMonth">{{displayInfo.month}}</a>
      </div>
      <div class="wk-date-next" @click="nextMonth('next')">»</div>
    </div>
    <div class="date-box" v-if="showInfo.day">
      <div class="wk-picker-box">
        <div class="wk-week">
          <ul>
            <li v-for="weekie in library.week">{{weekie}}</li>
          </ul>
        </div>
        <div class="wk-day-row">
          <div
          class="wk-day"
          v-for="(day,i) in dayList"

          @click="checkDay(day)"
          :class="{'checked':day.checked,'unavailable':day.unavailable,'wk-passive-day': !(day.inMonth)}"
          v-if="i < 7"><span>{{day.value}}</span></div>
        </div>
        <div class="wk-day-row">
          <div
          class="wk-day"
          v-for="(day,i) in dayList"
          @click="checkDay(day)"
          :class="{'checked':day.checked,'unavailable':day.unavailable,'wk-passive-day': !(day.inMonth)}"
          v-if="i >= 7 && i < 14"><span>{{day.value}}</span></div>
        </div>
        <div class="wk-day-row">
          <div
          class="wk-day"
          v-for="(day,i) in dayList"
          @click="checkDay(day)"
          :class="{'checked':day.checked,'unavailable':day.unavailable,'wk-passive-day': !(day.inMonth)}"
          v-if="i >= 14 && i < 21"><span>{{day.value}}</span></div>
        </div>
        <div class="wk-day-row">
          <div
          class="wk-day"
          v-for="(day,i) in dayList"
          @click="checkDay(day)"
          :class="{'checked':day.checked,'unavailable':day.unavailable,'wk-passive-day': !(day.inMonth)}"
          v-if="i >= 21 && i < 28"><span>{{day.value}}</span></div>
        </div>
        <div class="wk-day-row">
          <div
          class="wk-day"
          v-for="(day,i) in dayList"
          @click="checkDay(day)"
          :class="{'checked':day.checked,'unavailable':day.unavailable,'wk-passive-day': !(day.inMonth)}"
          v-if="i >= 28 && i < 35"><span>{{day.value}}</span></div>
        </div>
        <div class="wk-day-row">
          <div
          class="wk-day"
          v-for="(day,i) in dayList"
          @click="checkDay(day)"
          :class="{'checked':day.checked,'unavailable':day.unavailable,'wk-passive-day': !(day.inMonth)}"
          v-if="i >= 35 && i < 42"><span>{{day.value}}</span></div>
        </div>
      </div>
    </div>
    <div class="date-box list-box" v-if="showInfo.year">
      <div class="wk-picker-box wk-date-list" id="yearList">
        <div class="wk-date-item" v-for="(yearItem,i) in library.year" @click="setYear(yearItem)">{{yearItem}}</div>
      </div>
    </div>
    <div class="date-box list-box" v-if="showInfo.month">
      <div class="wk-picker-box wk-date-list">
        <div class="wk-date-item" v-for="(monthItem,i) in library.month"  @click="setMonth(monthItem)">{{monthItem}}</div>
      </div>
    </div>
    <div class="date-box list-box" v-if="showInfo.hour">
      <div class="wk-picker-box wk-date-list">
        <div class="wk-watch-box">
          <div class="wk-hour-box">
            <div class="mui-pciker-rule mui-pciker-rule-ft"></div>
            <ul>
              <li class="wk-hour-item" v-for="hitem in hours" @click="setTime('hour', hitem, hours)"
              :class="{'active':hitem.checked}">{{hitem.value}}</li>
            </ul>
          </div>
          <div class="wk-min-box">
            <div class="mui-pciker-rule mui-pciker-rule-ft"></div>
              <div
              class="wk-min-item"
              v-for="mitem in mins"
              @click="setTime('min',mitem, mins)"
              :class="{'active':mitem.checked}"
              >{{mitem.value}}</div>
            </div>
        </div>
      </div>
    </div>
    <div class="wk-button-box">
      <Button @click="dismiss" :text="option.buttons? option.buttons.cancel : 'Cancel' " ></Button>
      <Button @click="picked" :text="option.buttons? option.buttons.ok : 'Ok' " ></Button>
    </div>
  </div>
</template>

<script>
// week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
// month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
/*eslint-disable*/
import moment from 'moment'
import {Button} from '../button'
import {getZIndex} from '../utils'
export default {
  props: {
    show:{
      type: Boolean,
      default:false,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'day'
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    option: {
      type: Object,
      default () {
        return {
          week: ['一', '二', '三', '四', '五', '六', '日'],
          month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          buttons : {
            ok : '确定',
            cancel : '取消'
          }
        }
      }
    },
    limit: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed:{
  },
  data() {
    function hours() {
        let list = []
        let hour = 24
        while (hour > 0) {
          hour--
          list.push({
            checked: false,
            value: hour < 10 ?  '0' + hour : hour
          })
        }
        return list
      }
    function mins() {
      let list = []
      let min = 60
      while (min > 0) {
        min--
        list.push({
          checked: false,
          value: min < 10 ?  '0' + min : min
        })
      }
      return list
    }
    return {
      zIndex: getZIndex(),
      hours: hours(),
      mins: mins(),
      showInfo: {
        hour: false,
        day: false,
        month: false,
        year: false,
        check: false
      },
      displayInfo: {
        month: ''
      },
      library: {
        week: this.option.week,
        month: this.option.month,
        year: []
      },
      checked: {
        oldtime: '',
        currentMoment: null,
        year: '',
        month: '',
        day: '',
        hour: '00',
        min: '00'
      },
      dayList: [],
      selectedDays: []
    }
  },
  mounted (){
    this.showCheck()
  },
  methods: {
    prevent (event) {
      event.preventDefault()
      event.stopPropagation()
    },
    pad (n){
      return n<10 ? '0'+ n : n
    },
    nextMonth (type) {
      let next = null
      type == 'next' ? next = moment(this.checked.currentMoment).add(1, 'M') : next = moment(this.checked.currentMoment).add(-1, 'M')
      this.showDay(next)
    },
    showDay (time) {

      if (!time) {
        this.checked.currentMoment = moment()
      } else {
        this.checked.currentMoment = moment(time, this.format)
      }
      this.showOne('day')
      this.checked.year = moment(this.checked.currentMoment).format("YYYY")
      this.checked.month = moment(this.checked.currentMoment).format("MM")
      this.checked.day = moment(this.checked.currentMoment).format("DD")
      this.displayInfo.month = this.library.month[moment(this.checked.currentMoment).month()]
      let days = []
      let currentMoment = this.checked.currentMoment
      let firstDay = moment(currentMoment).date(1).day()
      //gettting previous and next month
      let currentMonth = moment(currentMoment)
      let previousMonth = moment(currentMoment)
      let nextMonth = moment(currentMoment)
      nextMonth.add(1,'months')
      previousMonth.subtract(1,'months')
      let monthDays = moment(currentMoment).daysInMonth()
      let oldtime = this.checked.oldtime;
      for (let i = 1; i <= monthDays; ++i) {
        days.push({
          value: i,
          inMonth: true,
          unavailable: false,
          checked: false,
          moment: moment(currentMoment).date(i)
        })
        if (i == Math.ceil(moment(currentMoment).format("D")) && moment(oldtime, this.format).year() == moment(currentMoment).year() && moment(oldtime, this.format).month() == moment(currentMoment).month()) {
          days[i - 1].checked = true
        }
        this.checkBySelectDays(i, days)
      }
      if (firstDay == 0) firstDay = 7
      for (let i = 0; i < firstDay - 1; i++) {
          let passiveDay = {
            value: previousMonth.daysInMonth() - (i),
            inMonth: false,
            action : 'previous',
            moment: moment(currentMoment).date(1).subtract(i+1, 'days')
          }
          days.unshift(passiveDay);
      }
      if (this.limit.length > 0) {
        for (let li of this.limit) {
          switch (li.type) {
            case 'fromto':
              days = this.limitFromTo(li, days)
              break;
            case 'weekday':
              days = this.limitWeekDay(li, days)
              break;
          }
        }
      }
      var passiveDaysAtFinal = 42 - days.length;
      for (let i = 1; i <= passiveDaysAtFinal; i++) {
          let passiveDay = {
            value: i,
            inMonth: false,
            action : 'next',
            moment: moment(currentMoment).add(1, 'months').date(i)
          }
          days.push(passiveDay);
      }
      this.dayList = days
    },
    checkBySelectDays (d, days) {
      this.selectedDays.forEach(day => {
        if (this.checked.year === moment(day).format("YYYY") && this.checked.month === moment(day).format("MM") && d === Math.ceil(moment(day).format("D"))) {
            days[d - 1].checked = true
        }
      })
    },
    limitWeekDay (limit, days) {
      days.map((day) => {
        if (limit.available.indexOf(day.moment.format('d')) == -1) {
          day.unavailable = true
        }
      })
      return days
    },
    limitFromTo (limit, days) {
      days.map((day) => {
        if (!day.moment.isBetween(limit.from, limit.to)) {
          day.unavailable = true
        }
      })
      return days
    },
    checkDay (obj) {
      if (obj.unavailable || obj.value == '') {
        return false
      }
      if(!(obj.inMonth)){
        this.nextMonth(obj.action)
      }
      if (this.type === 'day' || this.type === 'min') {
        this.dayList.map(x => x.checked = false)
        this.checked.day = this.pad(obj.value)
        obj.checked = true
      } else {
        let day = this.pad(obj.value)
        let ctime = this.checked.year + '-' + this.checked.month + '-' + day
        if (obj.checked === true) {
          obj.checked = false
          this.selectedDays.$remove(ctime)
        } else {
          this.selectedDays.push(ctime)
          obj.checked = true
        }
      }
      switch (this.type) {
        case 'day' :
        //  this.picked()
          break;
        case 'min' :
          this.showOne('hour')
          break;
      }
    },
    showYear () {
      let year = moment(this.checked.currentMoment).year()
      this.library.year = []
      let yearTmp = []
      for (let i = year - 100; i < year + 5; ++i) {
        yearTmp.push(i)
      }
      this.library.year = yearTmp
      this.showOne('year')
      let self = this
      this.$nextTick(() => {
        let listDom = this.$el.querySelector('#yearList')
        listDom.scrollTop = (listDom.scrollHeight - 100)
        self.addYear()
      })
    },
    showOne (type) {
      switch (type) {
        case 'year':
          this.showInfo.hour = false
          this.showInfo.day = false
          this.showInfo.year = true
          this.showInfo.month = false
          break;
        case 'month':
          this.showInfo.hour = false
          this.showInfo.day = false
          this.showInfo.year = false
          this.showInfo.month = true
          break;
        case 'day':
          this.showInfo.hour = false
          this.showInfo.day = true
          this.showInfo.year = false
          this.showInfo.month = false
          break;
        case 'hour':
          this.showInfo.hour = true
          this.showInfo.day = false
          this.showInfo.year = false
          this.showInfo.month = false
          break;
        default:
          this.showInfo.day = true
          this.showInfo.year = false
          this.showInfo.month = false
          this.showInfo.hour = false
      }
    },
    showMonth () {
      this.showOne('month')
    },
    addYear() {
      let self = this
      let listDom = this.$el.querySelector('#yearList')
      let tmp = 0
      listDom.addEventListener('scroll', function(e) {
        if (listDom.scrollTop < listDom.scrollHeight - 100) {
          let len = self.library.year.length
          let lastYear = self.library.year[len - 1]
          self.library.year.push(lastYear + 1)
        }
      }, false)
    },
    setYear(year) {
      this.checked.currentMoment = moment(year + '-' + this.checked.month + '-' + this.checked.day)
      this.showDay(this.checked.currentMoment)
    },
    setMonth(month) {
      let mo = (this.library.month.indexOf(month) + 1)
      if (mo < 10) {
        mo = '0' + '' + mo
      }
      this.checked.currentMoment = moment(this.checked.year + '-' + mo + '-' + this.checked.day)
      this.showDay(this.checked.currentMoment)
    },
    showCheck() {
      if (!this.time) {
        this.showDay()
      } else {
        if (this.type === 'day' || this.type === 'min') {
          this.checked.oldtime = this.time
          this.showDay(this.time)
        } else {
          this.selectedDays = JSON.parse(this.time)
          if (this.selectedDays.length) {
            this.checked.oldtime = this.selectedDays[0]
            this.showDay(this.selectedDays[0])
          } else {
            this.showDay()
          }
        }
      }
    },
    setTime (type, obj, list) {
      for (let item of list) {
        item.checked = false
        if (item.value == obj.value) {
          item.checked = true
          this.checked[type] = item.value
        }
      }
    },
    picked () {
      if (this.type === 'day' || this.type === 'min') {
        let ctime = this.checked.year + '-' + this.checked.month + '-' + this.checked.day+' '+this.checked.hour+':'+this.checked.min
        this.checked.currentMoment = moment(ctime, "YYYY-MM-DD HH:mm")
        this.time = moment(this.checked.currentMoment).format(this.format)
      } else {
        this.time = JSON.stringify(this.selectedDays)
      }
      this.$emit('date-select-sure', this.time)
    },
    dismiss () {
      this.$emit('date-select-cancel',this)
    }
  },
  components: {
  Button
  }
}
</script>
<style rel="stylesheet/less" type="text/less" lang="less">
  @import "../theme/variables.less";
  @import "../theme/tools.less";
.wk-date-picker {
  display: inline-block;
  background: @color;
  overflow: hidden;
  position: absolute;
  font-size: .32rem;
  font-weight: 400;
  max-width: 8rem;
  width: 90%;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
}
.wk-picker-box {
  background: #fff;
  width: 100%;
  max-width: 8rem;
  height: 5.6rem;
}
.wk-day-row{
  display: flex;
  justify-content: center;
  align-items: center;
}
.wk-day {
  width: 14.2857143%;
  text-align: center;
  cursor: pointer;
  height: .8rem;
  padding: 0;
  color: #000;
  background: #fff;
  .flex-shrink(10);
  display: flex;
  justify-content: center;
  align-items: center;
  > span {
    height: .72rem;
    line-height: .72rem;
    display: block;
    width: .72rem;
  }
  &.checked span{
    background: @red;
    color: #FFF !important;
    border-radius: 50%;
  }
}
.wk-week{
  height: .8rem;
  width: 100%;
}
.wk-week ul {
  margin: 0;
  padding: 0;
  list-style: none;
  height: .8rem;
}
.wk-week ul li {
  width: 14.2%;
  height: .8rem;
  line-height: .8rem;
  display: inline-block;
  text-align: center;
  background: transparent;
  color: #000;
  font-weight: bold;
}
.wk-passive-day{
  color: #bbb;
}
.unavailable {
  color: #ccc;
  cursor: not-allowed;
}
.wk-date-monthly {
  height: 2rem;
  color: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;

}
.wk-date-monthly > div {
  display: block;
  text-align: center;
  cursor: pointer;
}
.wk-date-previous,
.wk-date-next {
  position: relative;
  width: 20% !important;
  text-indent: -6rem;
  overflow: hidden;
  height: 100px;
  color: #fff;
}
.wk-date-caption {
  width: 60%;
  box-sizing: border-box;
  font-size: .48rem;
  a.date-year,
  a.date-month{
    .active-highlight();
    display: block;
    color: #FFF;
    position: relative;
  }
}

.wk-date-caption span:hover {
  color: rgba(255, 255, 255, 0.7);
}

.wk-date-next::before,
.wk-date-previous::before {
  width: .4rem;
  height: .04rem;
  text-align: center;
  position: absolute;
  background: #fff;
  top: 50%;
  margin-top: -0.14rem;
  margin-left: -0.14rem;
  left: 50%;
  line-height: 0;
  content: '';
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  transform: rotate(45deg);
}
.wk-date-next::after,
.wk-date-previous::after {
  width: .4rem;
  height: .04rem;
  text-align: center;
  position: absolute;
  background: #fff;
  margin-top: 6px;
  margin-left: -7px;
  top: 50%;
  left: 50%;
  line-height: 0;
  content: '';
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.wk-date-previous::after {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  transform: rotate(45deg);
}
.wk-date-previous::before {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.wk-date-item {
  text-align: center;
  font-size: .4rem;
  padding: .2rem 0;
  cursor: pointer;
}
.wk-date-item:hover {
  background: #e0e0e0;
}
.wk-date-list {
  overflow: auto;
  vertical-align: top;
  padding: 0;
}
.wk-vue-date {
  display: inline-block;
  color: #5D5D5D;
}
.wk-button-box {
  align-items: center;
  background: #fff;
  vertical-align: top;
  height: .96rem;
  line-height: .96rem;
  text-align: right;
  padding: .12rem .16rem;
  display: flex;
  justify-content: flex-end;
}
.wk-watch-box {
  height: 100%;
  overflow: hidden;
}
.wk-hour-box,
.wk-min-box {
  display: inline-block;
  width: 50%;
  text-align: center;
  height: 100%;
  overflow: auto;
  float: left;
}
.wk-hour-box ul,
.wk-min-box ul{
  list-style: none;
    margin: 0;
    padding: 0;
}
.wk-hour-item, .wk-min-item {
  padding: .2rem;
  font-size: .4rem;
  cursor: pointer;
}
.wk-hour-box .active, .wk-min-box .active{
  background: @red;
  color: #FFF !important;
}
::-webkit-scrollbar {
    width: 0;
}
::-webkit-scrollbar-track {
    background: #E3E3E3;
}
::-webkit-scrollbar-thumb {
    background: #C1C1C1;
    border-radius: .04rem;
}

</style>
