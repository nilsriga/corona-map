function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 56.955533,
      lng: 24.090859
    },
    zoom: 11,
    styles: [{
        elementType: "geometry",
        stylers: [{
          color: "#1d2c4d"
        }]
      },

      {
        elementType: "labels.icon",
        stylers: [{
          visibility: "off"
        }]
      },
      {
        elementType: "labels.text",
        stylers: [{
            color: "#51bfea"
          },
          {
            weight: 8
          }
        ]
      },
      {
        elementType: "labels.text.fill",
        stylers: [{
          color: "#0bf0f0"
        }]
      },
      {
        elementType: "labels.text.stroke",
        stylers: [{
            color: "#1a3646"
          },
          {
            visibility: "off"
          }
        ]
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels",
        stylers: [{
          visibility: "off"
        }]
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [{
          color: "#64779e"
        }]
      },
      {
        featureType: "administrative.locality",
        stylers: [{
          weight: 8
        }]
      },
      {
        featureType: "administrative.province",
        stylers: [{
          visibility: "off"
        }]
      },
      {
        featureType: "administrative.province",
        elementType: "geometry.stroke",
        stylers: [{
          color: "#4b6878"
        }]
      },
      {
        featureType: "landscape",
        stylers: [{
            color: "#f50530"
          },
          {
            weight: 8
          }
        ]
      },
      {
        featureType: "landscape.man_made",
        elementType: "geometry.stroke",
        stylers: [{
          color: "#334e87"
        }]
      },
      {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [{
          color: "#5a617e"
        }]
      },
      {
        featureType: "poi",
        stylers: [{
          visibility: "off"
        }]
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{
          color: "#283d6a"
        }]
      },
      {
        featureType: "poi",
        elementType: "labels.text",
        stylers: [{
          visibility: "off"
        }]
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{
          color: "#6f9ba5"
        }]
      },
      {
        featureType: "poi",
        elementType: "labels.text.stroke",
        stylers: [{
          color: "#1d2c4d"
        }]
      },
      {
        featureType: "poi.government",
        stylers: [{
          color: "#ffeb3b"
        }]
      },
      {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [{
          color: "#023e58"
        }]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{
          color: "#3C7680"
        }]
      },
      {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [{
          color: "#f50530"
        }]
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{
          color: "#98a5be"
        }]
      },
      {
        featureType: "road",
        elementType: "labels.text.stroke",
        stylers: [{
          color: "#1d2c4d"
        }]
      },
      {
        featureType: "road.highway",
        stylers: [{
          color: "#f94262"
        }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{
            color: "#f50530"
          },
          {
            visibility: "on"
          },
          {
            weight: 2.5
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [{
            color: "#f50530"
          },
          {
            visibility: "on"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{
            color: "#6f708e"
          },
          {
            weight: 0.5
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{
          color: "#b0d5ce"
        }]
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.stroke",
        stylers: [{
          color: "#023e58"
        }]
      },
      {
        featureType: "road.local",
        elementType: "labels",
        stylers: [{
          visibility: "off"
        }]
      },
      {
        featureType: "transit",
        stylers: [{
          visibility: "on"
        }]
      },
      {
        featureType: "transit",
        elementType: "labels.text.stroke",
        stylers: [{
          color: "#1d2c4d"
        }]
      },
      {
        featureType: "transit.line",
        elementType: "geometry.fill",
        stylers: [{
          color: "#f50530"
        }, ]
      },
      {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [{
          color: "#3a4762"
        }]
      },
      {
        featureType: "water",
        stylers: [{
          color: "#fe3d63"
        }]
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{
          color: "#4e6d70"
        }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{
          color: '#17263c'
        }]
      },

    ]
  });
  var riga = {
    lat: 56.924875,
    lng: 23.976440
  }
  var lidosta = {
    lat: 56.949172,
    lng: 24.096453
  }

  addMarker(riga, map);


  Popup = createPopupClass();
  popup = new Popup(
      new google.maps.LatLng(-33.866, 151.196),
      document.getElementById('content'));
  popup.setMap(map);

}

function addMarker(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  var marker = new google.maps.Marker({
    position: location,
    label: "1",
    map
  });
}

function createPopupClass() {
  /**
   * A customized popup on the map.
   * @param {!google.maps.LatLng} position
   * @param {!Element} content The bubble div.
   * @constructor
   * @extends {google.maps.OverlayView}
   */
  function Popup(position, content) {
    this.position = position;

    content.classList.add('popup-bubble');

    // This zero-height div is positioned at the bottom of the bubble.
    var bubbleAnchor = document.createElement('div');
    bubbleAnchor.classList.add('popup-bubble-anchor');
    bubbleAnchor.appendChild(content);

    // This zero-height div is positioned at the bottom of the tip.
    this.containerDiv = document.createElement('div');
    this.containerDiv.classList.add('popup-container');
    this.containerDiv.appendChild(bubbleAnchor);

    // Optionally stop clicks, etc., from bubbling up to the map.
    google.maps.OverlayView.preventMapHitsAndGesturesFrom(this.containerDiv);
  }
  // ES5 magic to extend google.maps.OverlayView.
  Popup.prototype = Object.create(google.maps.OverlayView.prototype);

  /** Called when the popup is added to the map. */
  Popup.prototype.onAdd = function() {
    this.getPanes().floatPane.appendChild(this.containerDiv);
  };

  /** Called when the popup is removed from the map. */
  Popup.prototype.onRemove = function() {
    if (this.containerDiv.parentElement) {
      this.containerDiv.parentElement.removeChild(this.containerDiv);
    }
  };

  /** Called each frame when the popup needs to draw itself. */
  Popup.prototype.draw = function() {
    var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);

    // Hide the popup when it is far out of view.
    var display =
        Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
        'block' :
        'none';

    if (display === 'block') {
      this.containerDiv.style.left = divPosition.x + 'px';
      this.containerDiv.style.top = divPosition.y + 'px';
    }
    if (this.containerDiv.style.display !== display) {
      this.containerDiv.style.display = display;
    }
  };

  return Popup;
}

// var lidosta
// var mark = new google.maps.Map(document.getElementById('map'), {
//   zoom: 12,
// });

// This event listener calls addMarker() when the map is clicked.


// Add a marker at the center of the map.
// addMarker(lidosta, map);

//   var polyline = new google.maps.Polyline({
// // set desired options for color, opacity, width, etc.
// strokeColor:"#0000FF",  // blue (RRGGBB, R=red, G=green, B=blue)
// strokeOpacity: 0.4      // opacity of line
// }); // create the polyline (global)
// var path = []; // global variable to hold all the past locations
// function gotdata(){
// var coordinates = [
// new google.maps.LatLng(56.924875, 23.976440),
// new google.maps.LatLng(56.924875, 22.976440),
// new google.maps.LatLng(56.924875, 23.531323),
// new google.maps.LatLng(55.924875, 23.976440)
// ];
// var contagionPath = new google.maps.Polyline({
// path: coordinates,
// strokeColor: "#FF0000",
// strokeOpacity: 1.0,
// strokeWeight: 2
// });

// polyline.setMap(map);
//  polyline.setPath(path);

// }

// function addMarker(location, map) {
//   // Add the marker at the clicked location, and add the next-available label
//   // from the array of alphabetical characters.
//   var marker = new google.maps.Marker({
//     position: location,
//     label: "1",
//     map
//   });
// }



// import axios from "axios"
// axios({
//   method: 'GET',
//   url: 'https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyDDZeOR-Rftpjab_ogG2DdmDEiLns-_XC4&center=56.941108341156905,24.013074705794548&zoom=11&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0x1d2c4d&style=element:geometry.fill%7Ccolor:0xe95256&style=element:labels.icon%7Cvisibility:off&style=element:labels.text%7Ccolor:0x51bfea%7Cweight:8&style=element:labels.text.fill%7Ccolor:0x0bf0f0&style=element:labels.text.stroke%7Ccolor:0x1a3646%7Cvisibility:off&style=feature:administrative.country%7Celement:geometry.stroke%7Ccolor:0x4b6878&style=feature:administrative.land_parcel%7Celement:labels%7Cvisibility:off&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0x64779e&style=feature:administrative.locality%7Cweight:8&style=feature:administrative.province%7Cvisibility:off&style=feature:administrative.province%7Celement:geometry.stroke%7Ccolor:0x4b6878&style=feature:landscape%7Ccolor:0xf50530%7Cweight:8&style=feature:landscape.man_made%7Celement:geometry.stroke%7Ccolor:0x334e87&style=feature:landscape.natural%7Celement:geometry%7Ccolor:0x023e58&style=feature:poi%7Cvisibility:off&style=feature:poi%7Celement:geometry%7Ccolor:0x283d6a&style=feature:poi%7Celement:labels.text%7Cvisibility:off&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x6f9ba5&style=feature:poi%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:poi.government%7Ccolor:0xffeb3b&style=feature:poi.park%7Celement:geometry.fill%7Ccolor:0x023e58&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x3C7680&style=feature:road%7Celement:geometry%7Ccolor:0x304a7d&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x98a5be&style=feature:road%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:road.highway%7Ccolor:0xf94262&style=feature:road.highway%7Celement:geometry%7Ccolor:0x2c6675&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0x255763&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0xb0d5ce&style=feature:road.highway%7Celement:labels.text.stroke%7Ccolor:0x023e58&style=feature:road.local%7Celement:labels%7Cvisibility:off&style=feature:transit%7Ccolor:0x48f2dd&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x98a5be&style=feature:transit%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:transit.line%7Celement:geometry.fill%7Ccolor:0x283d6a&style=feature:transit.station%7Celement:geometry%7Ccolor:0x3a4762&style=feature:water%7Ccolor:0xfe3d63%7Cvisibility:off&style=feature:water%7Celement:geometry%7Ccolor:0x0e1626&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x4e6d70&size=480x360&output=embed',
// });

// // Copy and paste the JSON into your app or website code.
// let a = [
//   {
//     elementType: "geometry",
//     stylers: [
//       {
//         color: "#1d2c4d"
//       }
//     ]
//   },
//   {
//     elementType: "labels.icon",
//     stylers: [
//       {
//         visibility: "off"
//       }
//     ]
//   },
//   {
//     elementType: "labels.text",
//     stylers: [
//       {
//         color: "#51bfea"
//       },
//       {
//         "weight": 8
//       }
//     ]
//   },
//   {
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#0bf0f0"
//       }
//     ]
//   },
//   {
//     elementType: "labels.text.stroke",
//     stylers: [
//       {
//         color: "#1a3646"
//       },
//       {
//         visibility: "off"
//       }
//     ]
//   },
//   {
//     featureType: "administrative.land_parcel",
//     elementType: "labels",
//     stylers: [
//       {
//         visibility: "off"
//       }
//     ]
//   },
//   {
//     featureType: "administrative.land_parcel",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#64779e"
//       }
//     ]
//   },
//   {
//     featureType: "administrative.locality",
//     stylers: [
//       {
//         "weight": 8
//       }
//     ]
//   },
//   {
//     featureType: "administrative.province",
//     stylers: [
//       {
//         visibility: "off"
//       }
//     ]
//   },
//   {
//     featureType: "administrative.province",
//     elementType: "geometry.stroke",
//     stylers: [
//       {
//         color: "#4b6878"
//       }
//     ]
//   },
//   {
//     featureType: "landscape",
//     stylers: [
//       {
//         color: "#f50530"
//       },
//       {
//         "weight": 8
//       }
//     ]
//   },
//   {
//     featureType: "landscape.man_made",
//     elementType: "geometry.stroke",
//     stylers: [
//       {
//         color: "#334e87"
//       }
//     ]
//   },
//   {
//     featureType: "landscape.natural",
//     elementType: "geometry",
//     stylers: [
//       {
//         color: "#5a617e"
//       }
//     ]
//   },
//   {
//     featureType: "poi",
//     stylers: [
//       {
//         visibility: "off"
//       }
//     ]
//   },
//   {
//     featureType: "poi",
//     elementType: "geometry",
//     stylers: [
//       {
//         color: "#283d6a"
//       }
//     ]
//   },
//   {
//     featureType: "poi",
//     elementType: "labels.text",
//     stylers: [
//       {
//         visibility: "off"
//       }
//     ]
//   },
//   {
//     featureType: "poi",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#6f9ba5"
//       }
//     ]
//   },
//   {
//     featureType: "poi",
//     elementType: "labels.text.stroke",
//     stylers: [
//       {
//         color: "#1d2c4d"
//       }
//     ]
//   },
//   {
//     featureType: "poi.government",
//     stylers: [
//       {
//         color: "#ffeb3b"
//       }
//     ]
//   },
//   {
//     featureType: "poi.park",
//     elementType: "geometry.fill",
//     stylers: [
//       {
//         color: "#023e58"
//       }
//     ]
//   },
//   {
//     featureType: "poi.park",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#3C7680"
//       }
//     ]
//   },
//   {
//     featureType: "road",
//     elementType: "geometry.fill",
//     stylers: [
//       {
//         color: "#f50530"
//       }
//     ]
//   },
//   {
//     featureType: "road",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#98a5be"
//       }
//     ]
//   },
//   {
//     featureType: "road",
//     elementType: "labels.text.stroke",
//     stylers: [
//       {
//         color: "#1d2c4d"
//       }
//     ]
//   },
//   {
//     featureType: "road.highway",
//     stylers: [
//       {
//         color: "#f94262"
//       }
//     ]
//   },
//   {
//     featureType: "road.highway",
//     elementType: "geometry",
//     stylers: [
//       {
//         color: "#f50530"
//       },
//       {
//         visibility: "on"
//       },
//       {
//         weight: 2.5
//       }
//     ]
//   },
//   {
//     featureType: "road.highway",
//     elementType: "geometry.fill",
//     stylers: [
//       {
//         color: "#f50530"
//       },
//       {
//         visibility: "on"
//       }
//     ]
//   },
//   {
//     featureType: "road.highway",
//     elementType: "geometry.stroke",
//     stylers: [
//       {
//         color: "#6f708e"
//       },
//       {
//         weight: 0.5
//       }
//     ]
//   },
//   {
//     featureType: "road.highway",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#b0d5ce"
//       }
//     ]
//   },
//   {
//     featureType: "road.highway",
//     elementType: "labels.text.stroke",
//     stylers: [
//       {
//         color: "#023e58"
//       }
//     ]
//   },
//   {
//     featureType: "road.local",
//     elementType: "labels",
//     stylers: [
//       {
//         visibility: "off"
//       }
//     ]
//   },
//   {
//     featureType: "transit",
//     stylers: [
//       {
//         visibility: "on"
//       }
//     ]
//   },
//   {
//     featureType: "transit",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#98a5be"
//       }
//     ]
//   },
//   {
//     featureType: "transit",
//     elementType: "labels.text.stroke",
//     stylers: [
//       {
//         color: "#1d2c4d"
//       }
//     ]
//   },
//   {
//     featureType: "transit.line",
//     elementType: "geometry.fill",
//     stylers: [
//       {
//         color: "#283d6a"
//       }
//     ]
//   },
//   {
//     featureType: "transit.station",
//     elementType: "geometry",
//     stylers: [
//       {
//         color: "#3a4762"
//       }
//     ]
//   },
//   {
//     featureType: "water",
//     stylers: [
//       {
//         color: "#fe3d63"
//       },
//       {
//         visibility: "off"
//       }
//     ]
//   },
//   {
//     featureType: "water",
//     elementType: "geometry",
//     stylers: [
//       {
//         color: "#0e1626"
//       },
//       {
//         visibility: "on"
//       }
//     ]
//   },
//   {
//     featureType: "water",
//     elementType: "labels.text.fill",
//     stylers: [
//       {
//         color: "#4e6d70"
//       }
//     ]
//   }
// ]


// let b = JSON.parse(a)

// console.log(b)

// Grab the URL for the Google Static Maps API.
// https://maps.googleapis.com/maps/api/staticmap?key=YOUR_API_KEY&center=56.908744170782875,384.05321032181405&zoom=12&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0x1d2c4d&style=element:labels.icon%7Cvisibility:off&style=element:labels.text%7Ccolor:0x51bfea%7Cweight:8&style=element:labels.text.fill%7Ccolor:0x0bf0f0&style=element:labels.text.stroke%7Ccolor:0x1a3646%7Cvisibility:off&style=feature:administrative.land_parcel%7Celement:labels%7Cvisibility:off&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0x64779e&style=feature:administrative.locality%7Cweight:8&style=feature:administrative.province%7Cvisibility:off&style=feature:administrative.province%7Celement:geometry.stroke%7Ccolor:0x4b6878&style=feature:landscape%7Ccolor:0xf50530%7Cweight:8&style=feature:landscape.man_made%7Celement:geometry.stroke%7Ccolor:0x334e87&style=feature:landscape.natural%7Celement:geometry%7Ccolor:0x5a617e&style=feature:poi%7Cvisibility:off&style=feature:poi%7Celement:geometry%7Ccolor:0x283d6a&style=feature:poi%7Celement:labels.text%7Cvisibility:off&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x6f9ba5&style=feature:poi%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:poi.government%7Ccolor:0xffeb3b&style=feature:poi.park%7Celement:geometry.fill%7Ccolor:0x023e58&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x3C7680&style=feature:road%7Celement:geometry.fill%7Ccolor:0xf50530&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x98a5be&style=feature:road%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:road.highway%7Ccolor:0xf94262&style=feature:road.highway%7Celement:geometry%7Ccolor:0xf50530%7Cvisibility:on%7Cweight:2.5&style=feature:road.highway%7Celement:geometry.fill%7Ccolor:0xf50530%7Cvisibility:on&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0x6f708e%7Cweight:0.5&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0xb0d5ce&style=feature:road.highway%7Celement:labels.text.stroke%7Ccolor:0x023e58&style=feature:road.local%7Celement:labels%7Cvisibility:off&style=feature:transit%7Cvisibility:on&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x98a5be&style=feature:transit%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:transit.line%7Celement:geometry.fill%7Ccolor:0x283d6a&style=feature:transit.station%7Celement:geometry%7Ccolor:0x3a4762&style=feature:water%7Ccolor:0xfe3d63%7Cvisibility:off&style=feature:water%7Celement:geometry%7Ccolor:0x0e1626%7Cvisibility:on&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x4e6d70&size=480x360
// Remember to enter your API key in the URL.





// // https://maps.googleapis.com/maps/api/staticmap?key=YOUR_API_KEY&center=56.931737325215295,383.9253795464115&zoom=10&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0x1d2c4d&style=element:labels.icon%7Cvisibility:off&style=element:labels.text%7Ccolor:0x51bfea%7Cweight:8&style=element:labels.text.fill%7Ccolor:0x0bf0f0&style=element:labels.text.stroke%7Ccolor:0x1a3646%7Cvisibility:off&style=feature:administrative.land_parcel%7Celement:labels%7Cvisibility:off&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0x64779e&style=feature:administrative.locality%7Cweight:8&style=feature:administrative.province%7Cvisibility:off&style=feature:administrative.province%7Celement:geometry.stroke%7Ccolor:0x4b6878&style=feature:landscape%7Ccolor:0xf50530%7Cweight:8&style=feature:landscape.man_made%7Celement:geometry.stroke%7Ccolor:0x334e87&style=feature:landscape.natural%7Celement:geometry%7Ccolor:0x5a617e&style=feature:poi%7Cvisibility:off&style=feature:poi%7Celement:geometry%7Ccolor:0x283d6a&style=feature:poi%7Celement:labels.text%7Cvisibility:off&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x6f9ba5&style=feature:poi%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:poi.government%7Ccolor:0xffeb3b&style=feature:poi.park%7Celement:geometry.fill%7Ccolor:0x023e58&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x3C7680&style=feature:road%7Celement:geometry.fill%7Ccolor:0xf50530&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x98a5be&style=feature:road%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:road.highway%7Ccolor:0xf94262&style=feature:road.highway%7Celement:geometry%7Ccolor:0xf50530%7Cvisibility:on%7Cweight:2.5&style=feature:road.highway%7Celement:geometry.fill%7Ccolor:0xf50530%7Cvisibility:on&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0x6f708e%7Cweight:0.5&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0xb0d5ce&style=feature:road.highway%7Celement:labels.text.stroke%7Ccolor:0x023e58&style=feature:road.local%7Celement:labels%7Cvisibility:off&style=feature:transit%7Cvisibility:on&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x98a5be&style=feature:transit%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:transit.line%7Celement:geometry.fill%7Ccolor:0x283d6a&style=feature:transit.station%7Celement:geometry%7Ccolor:0x3a4762&style=feature:water%7Ccolor:0xfe3d63%7Cvisibility:off&style=feature:water%7Celement:geometry%7Ccolor:0x0e1626&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x4e6d70&size=480x360

// // [
// //     {
// //       "elementType": "geometry",
// //       "stylers": [
// //         {
// //           "color": "#1d2c4d"
// //         }
// //       ]
// //     },
// //     {
// //       "elementType": "geometry.fill",
// //       "stylers": [
// //         {
// //           "color": "#e95256"
// //         }
// //       ]
// //     },
// //     {
// //       "elementType": "labels.icon",
// //       "stylers": [
// //         {
// //           "visibility": "off"
// //         }
// //       ]
// //     },
// //     {
// //       "elementType": "labels.text",
// //       "stylers": [
// //         {
// //           "color": "#51bfea"
// //         },
// //         {
// //           "weight": 8
// //         }
// //       ]
// //     },
// //     {
// //       "elementType": "labels.text.fill",
// //       "stylers": [
// //         {
// //           "color": "#0bf0f0"
// //         }
// //       ]
// //     },
// //     {
// //       "elementType": "labels.text.stroke",
// //       "stylers": [
// //         {
// //           "color": "#1a3646"
// //         },
// //         {
// //           "visibility": "off"
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "administrative.country",
// //       "elementType": "geometry.stroke",
// //       "stylers": [
// //         {
// //           "color": "#4b6878"
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "administrative.land_parcel",
// //       "elementType": "labels",
// //       "stylers": [
// //         {
// //           "visibility": "off"
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "administrative.land_parcel",
// //       "elementType": "labels.text.fill",
// //       "stylers": [
// //         {
// //           "color": "#64779e"
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "administrative.locality",
// //       "stylers": [
// //         {
// //           "weight": 8
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "administrative.province",
// //       "stylers": [
// //         {
// //           "visibility": "off"
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "administrative.province",
// //       "elementType": "geometry.stroke",
// //       "stylers": [
// //         {
// //           "color": "#4b6878"
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "landscape",
// //       "stylers": [
// //         {
// //           "color": "#f50530"
// //         },
// //         {
// //           "weight": 8
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "landscape.man_made",
// //       "elementType": "geometry.stroke",
// //       "stylers": [
// //         {
// //           "color": "#334e87"
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "landscape.natural",
// //       "elementType": "geometry",
// //       "stylers": [
// //         {
// //           "color": "#023e58"
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "poi",
// //       "stylers": [
// //         {
// //           "visibility": "off"
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "poi",
// //       "elementType": "geometry",
// //       "stylers": [
// //         {
// //           "color": "#283d6a"
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "poi",
// //       "elementType": "labels.text",
// //       "stylers": [
// //         {
// //           "visibility": "off"
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "poi",
// //       "elementType": "labels.text.fill",
// //       "stylers": [
// //         {
// //           "color": "#6f9ba5"
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "poi",
// //       "elementType": "labels.text.stroke",
// //       "stylers": [
// //         {
// //           "color": "#1d2c4d"
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "poi.government",
// //       "stylers": [
// //         {
// //           "color": "#ffeb3b"
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "poi.park",
// //       "elementType": "geometry.fill",
// //       "stylers": [
// //         {
// //           "color": "#023e58"
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "poi.park",
// //       "elementType": "labels.text.fill",
// //       "stylers": [
// //         {
// //           "color": "#3C7680"
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "road",
// //       "elementType": "geometry",
// //       "stylers": [
// //         {
// //           "color": "#304a7d"
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "road",
// //       "elementType": "labels.text.fill",
// //       "stylers": [
// //         {
// //           "color": "#98a5be"
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "road",
// //       "elementType": "labels.text.stroke",
// //       "stylers": [
// //         {
// //           "color": "#1d2c4d"
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "road.highway",
// //       "stylers": [
// //         {
// //           "color": "#f94262"
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "road.highway",
// //       "elementType": "geometry",
// //       "stylers": [
// //         {
// //           "color": "#2c6675"
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "road.highway",
// //       "elementType": "geometry.stroke",
// //       "stylers": [
// //         {
// //           "color": "#255763"
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "road.highway",
// //       "elementType": "labels.text.fill",
// //       "stylers": [
// //         {
// //           "color": "#b0d5ce"
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "road.highway",
// //       "elementType": "labels.text.stroke",
// //       "stylers": [
// //         {
// //           "color": "#023e58"
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "road.local",
// //       "elementType": "labels",
// //       "stylers": [
// //         {
// //           "visibility": "off"
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "transit",
// //       "stylers": [
// //         {
// //           "color": "#48f2dd"
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "transit",
// //       "elementType": "labels.text.fill",
// //       "stylers": [
// //         {
// //           "color": "#98a5be"
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "transit",
// //       "elementType": "labels.text.stroke",
// //       "stylers": [
// //         {
// //           "color": "#1d2c4d"
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "transit.line",
// //       "elementType": "geometry.fill",
// //       "stylers": [
// //         {
// //           "color": "#283d6a"
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "transit.station",
// //       "elementType": "geometry",
// //       "stylers": [
// //         {
// //           "color": "#3a4762"
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "water",
// //       "stylers": [
// //         {
// //           "color": "#fe3d63"
// //         },
// //         {
// //           "visibility": "off"
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "water",
// //       "elementType": "geometry",
// //       "stylers": [
// //         {
// //           "color": "#0e1626"
// //         }
// //       ]
// //     },
// //     {
// //       "featureType": "water",
// //       "elementType": "labels.text.fill",
// //       "stylers": [
// //         {
// //           "color": "#4e6d70"
// //         }
// //       ]
// //     }
// //   ]