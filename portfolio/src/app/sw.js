if ('serviceWorker' in navigator) {

  navigator.serviceWorker
    .register('./service-worker.js', { scope: './' })
    .then(registration => {
      // console.log("SW registered");
    })
    .catch(err => {
      // console.log("SW failed registration", err);
    })

}
