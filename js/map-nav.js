function initMap() {
  var map;
  var woodlands = { lat: 30.1687028, lng: -95.4710347 };
  var woodforest = { lat: 30.2719, lng: -95.4548 };
  var montgomery = { lat: 30.3885, lng: -95.6961 };
  var creekside = { lat: 30.1355, lng: -95.5708 };
  var center = { lat: 30.2131, lng: -95.5697 }; // The Woodlands set as the center point

  var mapOptions = {
    zoom: 11,
    center: center,
    scrollwheel: true,
  };

  var woodlandsInfo = `
        <div id="info-window">
            <div class="map-nav-card-container">
                <div class="map-nav-card">
                    <img class="map-nav-img" src="https://s3.us-east-2.amazonaws.com/rockrms-assets/twms-images/campuses-bg/Woodlands%20-%20White.jpg">
                </div>
            </div>
            <h3>The Woodlands Methodist Church</h3>
            <h4>Harvest - Sundays @ 9:30 in Harvest & 11: 00 a.m. in Robb Chapel</h4> </br>
            <h4>Loft - Saturday @ 6:00 and Sundays @ 9:30 & 11: 00 a.m.  </h4>
            <h4>Traditional Sundays @ 7:30 in Robb Chapell </h4>
            <p> </p>
            <p>2200 Lake Woodlands Dr, The Woodlands, TX 77380</p>
            <p>(281) 297-5900</p>
        </div>
`;
  var infowindow1 = new google.maps.InfoWindow({ content: woodlandsInfo });

  var woodforestInfo = `
        <div id="info-window">
            <div class="map-nav-card-container">
                <div class="map-nav-card">
                    <img class="map-nav-img" src="https://s3.us-east-2.amazonaws.com/rockrms-assets/twms-images/campuses-bg/Woodforest%20-%20White.jpg">
                </div>
            </div>
            <h4>The Church at Woodforest</h4>
            <p>700 Fish Creek Thoroughfare, Montgomery, TX 77316</p>
            <p>(936) 447-1240</p>
        </div>`;
  var infowindow2 = new google.maps.InfoWindow({ content: woodforestInfo });

  var montgomeryInfo = `
        <div id="info-window">
            <h5>The Church at Montgomery</h5>
            <p>12681 FM 149 Rd, Montgomery, TX 77316</p>
            <p>(936) 597-4362</p>
        </div>`;
  var infowindow3 = new google.maps.InfoWindow({ content: montgomeryInfo });

  var creeksideInfo = `
        <div id="info-window">
            <h5>The Church at Creekside</h5>
            <p>5633 Creekside Forest Dr, The Woodlands, TX 77389</p>
            <p>(281) 357-1900</p>
        </div>`;
  var infowindow4 = new google.maps.InfoWindow({ content: creeksideInfo });

  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  var markers = [
    {
      position: woodlands,
      title: "The Woodlands Methodist Church",
      info: infowindow1,
      icon: 'https://www.thewoodlandsmethodist.org/Content/web/twumc-logo-fullcolor.png'
    },
    {
      position: woodforest,
      title: "The Church at Woodforest",
      info: infowindow2,
    },
    {
      position: montgomery,
      title: "The Church at Montgomery",
      info: infowindow3,
    },
    {
      position: creekside,
      title: "The Church at Creekside",
      info: infowindow4,
    },
  ];

  markers.forEach(({ position, title, info }, index) => {
    var marker = new google.maps.Marker({
      position,
      map,
      title,
    });

    marker.addListener("click", function () {
        handleMarkerClick(marker);
    });
    
    // Adding touchend event for mobile devices
    marker.addListener("touchend", function () {
        handleMarkerClick(marker);
    });
    
    function handleMarkerClick(marker) {
        map.panTo(marker.getPosition());
        map.setZoom(13);
        marker.info.open(map, marker);
        markers.forEach((m, i) => {
            if (i !== index) m.info.close();
        });
    }

    document
      .getElementById(`location-${index + 1}`)
      .addEventListener("click", function () {
        map.panTo(position);
        map.setZoom(13);
        info.open(map, marker);
        markers.forEach((m, i) => {
          if (i !== index) m.info.close();
        });
      });
  });
}
