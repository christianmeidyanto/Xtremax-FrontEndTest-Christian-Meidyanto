let drop1 = new makedropdown('Mariana Bay Sands', 'caret1');
let drop2 = new makedropdown('Gardens By The Bay', 'caret2');
let drop3 = new makedropdown('Chinatown', 'caret3');
dropdown(drop1,'dropdown-btn1');
dropdown(drop2,'dropdown-btn2');
dropdown(drop3,'dropdown-btn3');

// dropdown menu icon caret up and down
function dropdown(drop,btn){
    let none = drop.location.concat(" <i class ='fa fa-caret-down'></i>");
    let block = drop.location.concat(" <i class ='fa fa-caret-up'></i>");
    document.getElementById(drop.caret).innerHTML = none;
    let dropdown = document.getElementsByClassName(btn);
    let i;

    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", function () {
        this.classList.toggle("active");
        let dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
          document.getElementById(drop.caret).innerHTML = none;
          drop.changeCondition();
        } else {
          document.getElementById(drop.caret).innerHTML = block;
          dropdownContent.style.display = "block";
          drop.changeCondition();
        }
      });
    }
}

function makedropdown(location, caret) {
  this.location = location;
  this.caret = caret;
  this.condition = false;
  this.changeCondition = function () {
    if (this.condition == false) this.condition = true;
    else this.condition = false;
  };
}


// Map
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
      center: {
          lat: 1.2930909090000183,
          lng: 103.8517427444458,
      },
      zoom: 15,
      mapId: "21040ab05f7b37d0",
  });
  let location_data = [];
  $.getJSON("js/mapdata.json", function (data) {
      a = 0;
      $.each(data, function (key, value) {
          location_data.push([value.place_name, value.Longitude, value.Latitude
          ]);
          a++;
      })
      //  console.log(location_data[1]);
      for (let i = 0; i < location_data.length; i++) {
          // console.log(location_data[i][1]);
          let lat = parseFloat(location_data[i][2]);
          let lng = parseFloat(location_data[i][1]);
          let title = location_data[i][0].toString();
          const position = {
              lat: lat,
              lng: lng
          };
          const contentString =
              '<div class="label-sm" style=width: 100px;height: 25px;background-color: #92D72E;border-radius: 10px 0px 0px 10px;color: #F8FCF1;>' +
              '<p class="label-sm-1">' +
              title +
              "</p>" +
              "</div>";
          const infowindow = new google.maps.InfoWindow({
              label: contentString,
          });
          const marker = new google.maps.Marker({
              position: position,
              map,
              label: {
                  color: '#496124',
                  text: title,
                  fontSize: 'large',
                  labelClass: "label-sm",
                  labelInBackground: true
              },
              title: title
          });
          marker.addListener("click", function () {
              const path = marker.getPosition();
              console.log(String(path.lng()));
              let lat = parseFloat(path.lat());
              let lng = parseFloat(path.lng());
              map.setCenter(new google.maps.LatLng(lat, lng));
              map.setZoom(17);
              const icon = document.getElementById("icon").style.display = "block";
              showInContentWindow(icon);
              const content = document.getElementById("content").style.display = "block";
              showInContentWindow(content);
              // document.getElementById(img).innerHTML = "<img src='".concat(img,
              //     "' class='img-fluid'>");
              // document.getElementById(title).innerHTML =
              //     Intro;
              // document.getElementById(body).innerHTML = desc;
          });
      }
  })
}
