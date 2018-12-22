navigator.serviceWorker.register('/sw.js', {scope: '/'}).then(reg => {
    console.log('SW Registration Successful');
}).catch(error => {
    console.log('SW Registration Unsuccessful');
})