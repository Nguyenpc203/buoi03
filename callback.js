//callbacks
function httpGetAsync(url, callbacks) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200) callbacks(xmlHttp);
    };
 
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
 }
 
 httpGetAsync('https://picsum.photos/200/300', function (response) {
    console.log(response);
 });
//  callbacks hell
function httpGetAsync(url, callbacks) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) callbacks(xmlHttp);
    };
 
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
 }
 
 httpGetAsync('https://picsum.photos/200/300', function (response) {
    document.getElementById('image').src = response.responseURL;
 
    httpGetAsync('https://picsum.photos/200/300', function (response) {
        document.getElementById('image2').src = response.responseURL;
 
        httpGetAsync('https://picsum.photos/200/300', function (response) {
            document.getElementById('image3').src = response.responseURL;
        });
    });
 });
//Promises resolve
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Done');
    });
 });
 
 myPromise.then((result) => {
    console.log(result);
 }, (error) => {
    console.log(error);
 });
 //Promises reject
 const myPromise1 = new Promise((resolve, reject) => {
    reject(new Error('Oh no! Promise was rejected!'));
 });
 
 myPromise1.then(() => {
    console.log('Promise was resolved!');
 }).catch((error) => {
    console.log(error.message);
 });
 //Promise Chaining
 const myPromise2 = new Promise((resolve, reject) => { 
    resolve('Promise was resolved!');
});

function apiCall1(result) { 
    // Function that returns a promise 
    return new Promise((resolve, reject) => { 
        console.log('value1'); 
        resolve('value1'); 
    });
}

function apiCall2(result) {
    // Function that returns a promise 
    return new Promise((resolve, reject) => { 
        console.log('value2'); 
        resolve('value2'); 
    });
}

myPromise2
    .then(result => { 
        console.log(result); 
        return result; 
    })
    .then(apiCall1) 
    .then(apiCall2) 
    .then(result => { 
        console.log('done!', result); 
    });

 // Tạo các promise
let promise1 = new Promise((resolve, reject) => setTimeout(() => resolve(10), 100));
let promise2 = new Promise((resolve, reject) => setTimeout(() => resolve(20), 200));
let promise3 = new Promise((resolve, reject) => setTimeout(() => resolve(30), 10));

Promise.all([promise1, promise2, promise3])
    .then(results => console.log(results));
// Kết quả mong đợi: [ 10, 20, 30 ]


// Tạo các promise
let promise01 = new Promise((resolve, reject) => { 
    setTimeout(() => { 
        reject('Error 1'); 
    }, 100); 
});
let promise02 = new Promise((resolve, reject) => { 
    setTimeout(() => { 
        reject('Error 2'); 
    }, 200); 
});
let promise03 = new Promise((resolve, reject) => { 
    setTimeout(() => { 
        reject('Error 3'); 
    }, 10); 
});
Promise.all([promise01, promise02, promise03])
    .then(console.log)
    .catch(console.log);
// Kết quả mong đợi:
// Error: Error 3


// Tạo các promise
let promise001 = new Promise((resolve, reject) => setTimeout(() => resolve(10), 100));
let promise002 = new Promise((resolve, reject) => setTimeout(() => resolve(20), 200));
let promise003 = new Promise((resolve, reject) => setTimeout(() => resolve(30), 10));

Promise.race([promise001, promise002, promise003])
    .then(result => console.log(result));

//Example
function downloadFile(url) {
    return new Promise((resolve, reject) => {
        $.get(url, (data, status) => {
            if (status === 'success')
                resolve(data);
            else
                reject(status);
        });
    });
}

function downloadAll() {
    downloadFile('index.html')
        .then((data) => {
            console.log('Tải xong index.html');
            return downloadFile('style.css');
        })
        .then((data) => {
            console.log('Tải xong style.css');
            return downloadFile('script.js');
        })
        .then((data) => {
            console.log('Tải xong script.js');
        })
        .catch((error) => {
            console.error('Đã xảy ra lỗi:', error);
        });
}
downloadAll();

async function downloadAll() {
    try {
        // Các biến f1, f2, f3 là data tải được
        let f1 = await downloadFile('index.html');
        console.log('Tải xong index.html');
        let f2 = await downloadFile('style.css');
        console.log('Tải xong style.css');
        let f3 = await downloadFile('script.js');
        console.log('Tải xong script.js');
    } catch (error) {
        console.error('Đã xảy ra lỗi:', error);
    }
}

downloadAll();

async function downloadAll() {
    try {
    let f1 = await downloadFile('index.html');
    console.log('Tải xong index.html');
    let f2 = await downloadFile('style.css');
    console.log('Tải xong style.css');
    let f3 = await downloadFile('script.js');
    console.log('Tải xong script.js');
    } catch (err) {
    console.log(err);
    }
    }
    downloadAll();
