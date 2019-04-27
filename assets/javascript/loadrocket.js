$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}
try {
    sessionStorage.getItem("user");
}
catch{ console.log("UsernameError") }


var countdown, distance, launchTime;

var x = setInterval(function () {
    now = moment().format('MMMM D, YYYY HH:mm:ss');
    nowX = moment(now).format('X');
    launchTimeX = moment(launchTime).format('X');
    distance = Math.floor((launchTimeX - nowX) * 1000);

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    $("#countdown").html(days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ");

    if (distance < 0) {
        clearInterval(x);
        $("#countdown").html("LAUNCHED");
    }

}, 1000);

$.ajax({
    type: 'GET',
    url: "https://launchlibrary.net/1.4/launch?fields=location,mission,rocket,windowstart&id=" + $.urlParam('id')
}).then(function (response) {


    launchTime = (response.launches[0].windowstart);

    $("#dashCard-title").text(response.launches[0].rocket.name);
    $("#launch-location").text(response.launches[0].location.name);
    $("#launch-start").text(response.launches[0].windowstart);
    $("#rocket-image").attr("src", response.launches[0].rocket.imageURL);
    if (response.launches[0].missions.length == 0) {
        $("#payload").text("TOP SECRET");
    } else {    
        $("#payload").text(response.launches[0].missions[0].description);
    }


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

    })

      $.getJSON('https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&&inprop=url&gsrsearch='+wikipage+'&limit=1&callback=?', function(data) {

   
    for(x in data.query.pages){
        
        
    }

    Object.values(data.query.pages).forEach(function(element){
        
        var wiki=$("#wiki-links");
       var link= $("<a>").text(element.title + " || ");
        link.attr("href", "https://en.wikipedia.org/wiki/"+element.title)
        link.addClass("wikiTag");
       wiki.append(link);
    })
    
});


});






