console.log("this is my inject.js")

let date = {
    isDuringDate: function (beginDateStr) {
        let curDate = new Date()
        let beginDate = new Date(beginDateStr)
        return curDate >= beginDate;

    },
};

function latestHalfHour(){
    let now = new Date()
    let h = now.getHours()
    let m = now.toLocaleTimeString().replace(/^\D*/, '').substring(3,5)
    if(Math.floor(parseInt(m) / 30) === 0){
        m = '00'
    }else{
        m ='30'
    }
    let half_hour = new Date().toLocaleDateString() + ' ' + h +':' + m +':00'
    return new Date(half_hour)
}
console.log(date.isDuringDate('2021/12/20 22:00'))
let a = '22:05'
new Date().toLocaleTimeString().replace(/^\D*/, '').substring(3,5)
Math.floor(parseInt(a.substring(3,)) / 30)
