$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}
try {
    console.log(sessionStorage.getItem("user"));
}
catch{ console.log("UsernameError") }
console.log($.urlParam('id'));

var countdown, distance, launchTime;

// Update the count down every 1 second
var x = setInterval(function () {
    now = moment().format('MMMM D, YYYY HH:mm:ss');
    nowX = moment(now).format('X');
    launchTimeX = moment(launchTime).format('X');
    distance = Math.floor((launchTimeX - nowX) * 1000);

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    $("#countdown").html(days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ");

    // If the count down is finished, write some text 
    if (distance < 0) {
        clearInterval(x);
        $("#countdown").html("LAUNCHED");
    }

}, 1000);

$.ajax({
    type: 'GET',
    url: "https://launchlibrary.net/1.4/launch?fields=location,mission,rocket,windowstart&id=" + $.urlParam('id')
}).then(function (response) {
    console.log(response);

    launchTime = (response.launches[0].windowstart);

    // $("#countdown").text(countdown);
    $("#launch-name").text(response.launches[0].rocket.name);
    $("#launch-location").text(response.launches[0].location.name);
    $("#launch-start").text(response.launches[0].windowstart);
    $("#rocket-image").attr("src", response.launches[0].rocket.imageURL);
    $("#payload").text(response.launches[0].missions[0].description);


    var rocketname=response.launches[0].rocket.name;
    var wikipage;
    if(rocketname.includes('Falcon Heavy')){
    wikipage="Falcon Heavy";
    }
    if(rocketname.includes('Falcon 9')){
        wikipage="Falcon 9";
    }
    if(rocketname.includes('Antares')){
        wikipage="Antares (rocket)";
    }
    
    $.ajax({
        type: "GET",
        origin:'*',
        headers: {
            "User-Agent": "someone"
          },
        url:"https://en.wikipedia.org/w/api.php?action=opensearch&search='+wikipage+'&limit=1&format=json"
    }).then(function(response){
console.log(response);
    })
    
    
    // $.getJSON(
    //     'https://en.wikipedia.org/w/api.php?action=opensearch&search='+wikipage+'&limit=1&format=jsonp&origin=localhost'
    //     ,
    //      function(data){ console.log(data);
    //         var articledescription=data.query.pages;
    //         console.log(Object.values(articledescription));
    //         console.log(Object.values(articledescription)[0].revisions[0]);
    //     // $("#wiki-info").text(data);
    //     }
    //   );

      $.getJSON('https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&&inprop=url&gsrsearch='+wikipage+'&limit=1&callback=?', function(data) {
    console.log(data);
   
    for(x in data.query.pages){
        console.log(x.title);
        
    }

    console.log(Object.values(data.query.pages).forEach(function(element){
        console.log(element.title);
        var wiki=$("#wiki-links");
       var link= $("<a>").text(element.title);
        link.attr("href", "https://en.wikipedia.org/wiki/"+element.title)
       wiki.append(link);
    }))
    
});


});






