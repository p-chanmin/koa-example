const moment = require('moment');

/**
 * 오늘 날짜의 글일경우 N분전 또는 N시간전 등으로 표기
 * 오늘 이전의 날짜의 경우엔 YYYY-MM-DD 형식으로 표기
 * @param {string} date 'YYYY-MM-DD HH:mm:ss' 형식의 문자
 * @return {string}
 */
exports.dateFromNow = (date) => {
    if(moment(date).diff(moment(), 'days') != 0){
        return moment(date).format("YYYY-MM-DD");
    }
    else{
        let min = moment().diff(moment(date), 'minutes')
        if(min < 60) return `${min}분전`
        else return `${moment().diff(moment(date), 'hours')}시간전`
    }
}

/**
 * 현재 등록한 글이 새 글인지 판단해주는 함수
 * 글을 작성한지 10분 이내의 글은 true를, 이후엔 false를 반환
 * @param {string} date 'YYYY-MM-DD HH:mm:ss' 형식의 문자
 * @return {bool}
 */
exports.isNewFeed = (date) =>{
    let currentTime = moment().add(-10, 'minute');
    let feedDate = moment(date);
    return feedDate.isAfter(currentTime)
}
