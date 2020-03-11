

// function chooseTheHighest(arr, fn) {
//     var newArr = []

//     for (let i = 0; i < arr.length; i++) {
//         newArr.push(fn(arr[i]))
//     }

//     return newArr
// }

// var arr1 = [1, 2, 3, 4, 2, 6, 2, 4, 2, 99, 4, 22, 22, 111232, 23, 0, 2, 15, 3, 3]

// var arr2 = chooseTheHighest(arr1, (item) => {
//     let highest = arr1[arr1.indexOf(item) + 1]
//     console.log(highest)
//     return item > highest ? item : highest
    
// })

// console.log(arr2)


// var functionWithParametersAndCallback = (string, number) => {
//     let d = string+number
//     return (c) => {
//         c(d)
//     }
// }

// functionWithParametersAndCallback("asdf", 123)( (res) => {
//     res = res + " Melany"
//     return console.log(res)
// })


// var synchronousFunctionWithUserCallback = (params, callback) => {
//     let res = 
//     `
//     1. I am a computation of users parameters.
//     2. Users parameters == "${params}"
//     `
//     let usersCallback = callback
//     return () => { 
//         return usersCallback(res)
//     }
// }

// var result = synchronousFunctionWithUserCallback("My Parameters", (res) => {
//     return res + "3. I am a user computation in my callback\n"
// })()

// console.log(result)


// let a = 1
// switch(a) {
//     case 1:
//         (function asdf() {
//             return console.log(a) 
//         })()
//         break;
// }

// let a = "name sake".toLowerCase().split(/[\s-,.]+/gi)
// let b = "name sake"

// b.forEach(el => {
//     console.log(el)
// });

// console.log()

// let a = [89, 78, 67, 45, 34, 23, 12, 11, 89, 78, 67, 45, 34, 23, 12, 11, 89, 78, 67, 45, 34, 23, 12, 11, 89, 78, 67, 45, 34, 23, 12, 11, 89, 78, 67, 45, 34, 23, 12, 11, 89, 78, 67, 45, 34, 23, 12, 11].sort()
// console.log(a)