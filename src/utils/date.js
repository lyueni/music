export function parseDate(time){
  var curDate = new Date();
  curDate.setTime(time);
  var year = curDate.getFullYear();
  var month = curDate.getMonth() + 1;
  month = month < 10 ? '0'+month: month;
  var date = curDate.getDate();
  date = date < 10 ? '0'+date: date;
  return year+'年'+month+'月'+date +'日';
};

export function parseDateS(time){
  var curDate = new Date();
  curDate.setTime(time);
  var month = curDate.getMonth() + 1;
  month = month < 10 ? '0'+month: month;
  var date = curDate.getDate();
  date = date < 10 ? '0'+date: date;
  return month+'月'+date +'日';
};
export function parseDateT(time){
  var curDate = new Date();
  curDate.setTime(time);
  var year = curDate.getFullYear();
  var month = curDate.getMonth() + 1;
  month = month < 10 ? '0'+month: month;
  var date = curDate.getDate();
  date = date < 10 ? '0'+date: date;
  return year+'-'+month+'-'+date;
};