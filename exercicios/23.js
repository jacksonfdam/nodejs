/*
https://docs.nodejitsu.com/
*/

for (var i = 0; i < 5; i++) {
   setTimeout(function () {
     console.log(i);
   }, i);
 }
/*
5
5
5
5
5
*/

for (var i = 0; i < 5; i++) {
   (function(i) {
     setTimeout(function () {
       console.log(i);
     }, i);
   })(i);
}


/*

0
1
2
3
4

*/