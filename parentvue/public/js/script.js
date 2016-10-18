var posn;
var map;
var mapProp;
var watchID;
var curr_user;
var friend_marker;
var markers = [];
var watchArea_circle;
var watchArea_center;
var watchArea_radius;
var alertOn;
var watch_timeout;
var alert_status;
var watchArea_bounds;
var watchAlert_tone;
var selected_profile;
var groupname;
//google.maps.event.addDomListener(window, 'load', initializemap);
function getLocation() {
    var x = document.getElementById("demo");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    posn = position;
    var x = document.getElementById("demo");
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude; 
}
google.maps.event.addDomListener(window, 'load', initializemap);
window.onload = initializemap();
function initializemap(){

      var lat;
      var lng;
      
      if(posn == null){
          lat = 32.81;
          lng = -92.00;
      }
      else{
          lat = posn.coords.latitude;
          lng = posn.coords.longitude;
      }
        
        map = new google.maps.Map(document.getElementById('googlemap'), {
          center: {lat: lat, lng: lng},
          zoom: 8
        });
    
       // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          //if (places.length == 0) {
          //  return;
          //}

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
}

//common function to place a marker on a map

function drawMarker(lat,lng,user)
{
      friend_marker = new MarkerWithLabel({
          
          position: new google.maps.LatLng(lat,lng),
          map: map,
          title: user,
          labelClass: "labels",
          labelContent: user
        });
  
// To add the marker to the map, call setMap();
    friend_marker.setMap(map); 
    return(friend_marker);
}

function buildSelectGroup_listBox(event)
{
     $.ajax({
  type: "GET",
  url: "getGroup.php",
  data: { groupname: name }
    })
  .done(function( data ) {
   
 var parsedgroupData = JSON.parse(data);
 var menu;
    if($('#grouplist option').length < 2 )
    {
       for(var i = 0; i < parsedgroupData.length; i++) {
       menu= parsedgroupData[i]["groupname"].toUpperCase();  
       $('#grouplist').append('<option value=' + menu + '>' + menu + '</option>');
       }
       $('#grouplist').append('<option value=' + "None" + '>' + "None" + '</option>');
   }
  }); 
}

function Group_dropdownlistBox(event)
{
    $.ajax({
  type: "GET",
  url: "getGroup.php",
  data: { groupname: name }
    })
  .done(function( data ) {
   
 var parsedgroupData = JSON.parse(data);
 var menu;
    if($('#groupdropdown ul li').length < 2 )
    {
       for(var i = 0; i < parsedgroupData.length; i++) {
       menu= parsedgroupData[i]["groupname"].toUpperCase();  
       $('#groupdropdown ul').append('<li value=' + menu + '><a href="#" id ="' + menu +'" onclick = "groupClick(this)"><i class="fa fa-check "></i><span class="search-option">' + menu + '</span></a></li>');
       $('#groupdropdown > ul > li > a').removeClass('selected');  
       }      
   }
  }); 
    
}

function groupClick(obj)
{
    $('#groupdropdown > ul > li > a').removeClass('selected');
    $(obj).addClass('selected'); 
    groupname = obj.id
    showGroup(groupname);
}

function  showGroup(groupname)
{
  $.ajax({
  type: "GET",
  url: "showGroup.php",
  data: { groupname: groupname }
    })
  .done(function( data ) {
 document.getElementById("groupmenu").innerHTML = groupname +" <span class='caret'></span>";  
 var parsedgroupListData = JSON.parse(data);
        if(parsedgroupListData.length > 0)
        {
        var profilename;
        $('#groupitem li').remove();

           if($('#groupitem li').length === 0 )
           {
               for(var i = 0; i < parsedgroupListData.length; i++) 
               {                           
               profilename= parsedgroupListData[i]["username"].toUpperCase();  
               $('#groupitem').append( '<li><button id = "' + profilename +'" type="button" class="btn btn-primary" name="' + profilename + '" onClick="showFriend(this)" value ="' + profilename +'" ><img src="images/avatar.png" width="30" /><br />'+profilename+'</button></li>');
               }//<br><label class="switch"><input type="checkbox"><div class="slider round"></div></label>
               showFriends();
           } 
       }
       else
       {
        $('#groupitem li').remove();
        deleteMarkers();
        document.getElementById("status").innerHTML = "Friends list empty";
       }
  });
  }
 
//geo location function + changes the button status from start tracking to stop tracking and vice versa
  function startTracking(obj) 
  {
    // Throw an error if no update is received every 30 seconds
    var options = { timeout: 30000 };
    curr_user = obj.id;
    if(document.getElementById(curr_user).value == 'ON')
    {
    document.getElementById(curr_user).innerHTML = "Stop Tracking";
    document.getElementById(curr_user).value = 'OFF';
        if(watchID == null)//executes only id the status is ON and updates the location every 30 secs.
        {
        watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);//gets the position(api)
        
        }
    }
    else
    {
     document.getElementById(curr_user).innerHTML = "Start Tracking";  
     document.getElementById(curr_user).value = 'ON';
      if(watchID != null)
      {
          navigator.geolocation.clearWatch(watchID);
          watchID = null;
      }
    }
 
  }
 
function onSuccess(position)
{
//var user = document.getElementById('track').value;
insertposition(position.coords.latitude, position.coords.longitude , curr_user);
}  

function onError(error) 
{
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

function insertposition(lat, lon , user)
{
 $.ajax({
             type: "POST",
             url: "insertposition.php",
             data: {
                    username:user,
                    latitude:lat,
                    longitude:lon
                  },
                        
             success: function(data) {
                  displayMarker(lat, lon, user);
                }
        });
}
  

function displayMarker(lat, lon , user)
{
    mapProp = {
    center:new google.maps.LatLng(lat,lon),
    zoom:5,
    mapTypeId:google.maps.MapTypeId.ROADMAP
    };

   map.setCenter(new google.maps.LatLng(lat,lon));
   map.setZoom(15);
   //Call map
   google.maps.event.trigger(map, 'resize');
   // Delete current marker before displaying new one
//   if(friend_marker)
//   {
//   friend_marker.setMap(null);    
//   }
   markers.push(drawMarker(lat, lon, user));
}

function showFriend(obj)
{
    selected_profile = obj.id;
    $.ajax({
             type: "POST",
             url: "friendsLocation.php",
             data: {
                    username:obj.id,
                   },
             
             success: function(data) 
             {
             var parsedFriendData = JSON.parse(data);
             if(parsedFriendData.length > 0)
                {
                    displayMarker(parsedFriendData[0]["latitude"], parsedFriendData[0]["longitude"], parsedFriendData[0]["username"]);
                }
                else
                {
                deleteMarkers();
                }
             },
             error: function()
             {
             document.getElementById("status").innerHTML = "No friend in this group";  
             deleteMarkers();
             }
        });       
}

function showFriends()
{
//Call Ajax
 $.ajax({
             type: "POST",
             url: "showFriends.php",
             success: function(data) {
                var parsedData = JSON.parse(data);
                if(parsedData.length > 0)
                {
                displayFriends(parsedData);
                }
                else
                {
                    document.getElementById("status").innerHTML = "Friends list empty";  
                }
            }
        });
}

function displayFriends(data){
        //create empty LatLngBounds object
    map.setCenter(new google.maps.LatLng(data[0].latitude, data[0].longitude));
    var bounds = new google.maps.LatLngBounds();
    
    if( markers.length > 0)
    {
        markers.forEach(function(marker) {
            marker.setMap(null);
          });
    }
    //Loop through all the points
    for (i = 0; i < data.length; i++)
    {
        //Build marker and push it into global markers array
        markers.push(drawMarker(data[i].latitude, data[i].longitude, data[i].username));
        //extend the bounds to include each marker's position
        bounds.extend(new google.maps.LatLng(data[i].latitude ,data[i].longitude));
    }
     
    //now fit the map to the newly inclusive bounds
    map.fitBounds(bounds);
    
    //Call map
    google.maps.event.trigger(map, 'resize');
}
  function setDest()
  {
    //If a circle overlay exists, clear it.
    if(watchArea_circle)
    {
    watchArea_circle.setMap(null); 
    watchArea_circle = null;
    }
    // Get choosen map destination as center
    watchArea_center = map.getCenter(); 
    //Draw the circle overlay
    drawCircle();
  }
//function for Watch Center ---centers the map on click
  function setCenterDest()
  {
    //If a circle overlay exists, clear it.
    if(watchArea_circle)
    {
    map.setCenter(watchArea_center); 
    google.maps.event.trigger(map, 'resize');
    }

  }
  
function getSelectedRadius()
{
  watchArea_radius = document.getElementById("pac-select").value;  
  drawCircle();
}


function drawCircle()
{
  
    watchArea_radius = document.getElementById("pac-select").value; 
    
    if(watchArea_circle == null )
    {
    watchArea_circle = new google.maps.Circle({
    fillColor:'#FFFFFF',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillOpacity: 0.35,
    map: map,
    radius: watchArea_radius*1609.34,// 50 MI feet conversion 1609.34
    center: watchArea_center,
    visible: true
    });
    }
    else
    {
    watchArea_circle.setRadius(watchArea_radius*1609.34);  
    if(alertOn)
        {
        drawAlertOverlay();
        }
    }
  
}

function alertClick(obj)
{
//    var alert = document.getElementById("alert");

       if($(obj).prop('checked'))
      {
      alertOn = true;
      if(watch_timeout == null)
        {
        drawAlertOverlay();
        watch_timeout = setTimeout(drawAlertOverlay, 10000);
        }
      }
      else
      {
      alertOn = false;  
      if(watch_timeout)
        {
        if(watchArea_circle)
        {
        watchArea_circle.set('strokeColor', '#000000');  //black
        watchArea_circle.set('fillColor', '#FFFFFF'); //white
        }
        clearTimeout(watch_timeout);//claring the timer
        watch_timeout = null;//make the timer null
        if(watchAlert_tone)
        {
        watchAlert_tone.pause();
        }
        }
      }
  
}

//alert button slide event control using jquery
$(function() {
  $('#alert-toggle').change(function() {
      if($(this).prop('checked'))
      {
      alertOn = true;
      if(watch_timeout == null)
        {
        drawAlertOverlay();
        watch_timeout = setTimeout(drawAlertOverlay, 10000);
        }
      }
      else
      {
      alertOn = false;  
      if(watch_timeout)
        {
        if(watchArea_circle)
        {
        watchArea_circle.set('strokeColor', '#000000');  //black
        watchArea_circle.set('fillColor', '#FFFFFF'); //white
        }
        clearTimeout(watch_timeout);//claring the timer
        watch_timeout = null;//make the timer null
        if(watchAlert_tone)
        {
        watchAlert_tone.pause();
        }
        }
      }
  })
})

function drawAlertOverlay()
{   
    watchArea_bounds = watchArea_circle.getBounds();
    var friend_currPos;
    $.ajax({
          type: "POST",
          url: "showFriends.php",
          data: {
                 username:"paru",
                },
          success: function(data) {
             var parsedData = JSON.parse(data);
             alert_status = 0;//0 or false
             for (i = 0; i < parsedData.length; i++)
             {
                friend_currPos = new google.maps.LatLng(parsedData[i].latitude, parsedData[i].longitude);
                //alert_status |= watchArea_bounds.contains(friend_currPos);//or = 
                
                if(google.maps.geometry.spherical.computeDistanceBetween(watchArea_center, friend_currPos) <= ( watchArea_radius * 1609.34))
                {
                    alert_status |= false;
                }
                else
                {
                    alert_status |= true;  
                }
             }

            watchAlert_tone = document.getElementById("myAudio");
            if(alert_status)
                {
                watchAlert_tone.play();
                watchArea_circle.set('strokeColor', '#FF0000');  
                watchArea_circle.set('fillColor', '#FF0000');  
                }
            else
                {
                watchAlert_tone.pause();
                watchArea_circle.set('strokeColor', '#00FF00'); 
                watchArea_circle.set('fillColor', '#00FF00');  
                } 
          }
          
     }); 

}

function friendsInsideWatchArea()
{
    watchArea_bounds = watchArea_circle.getBounds();
    var friend_currPos;
    $.ajax({
          type: "POST",
          url: "showFriends.php",
          data: {
                 username:"paru",
                },
          success: function(data) {
             var parsedData = JSON.parse(data);
             alert_status = 0;
             for (i = 0; i < parsedData.length; i++)
             {
                friend_currPos = new google.maps.LatLng(parsedData[i].latitude, parsedData[i].longitude);
                //alert_status |= watchArea_bounds.contains(friend_currPos);//or = 
                
                if(google.maps.geometry.spherical.computeDistanceBetween(watchArea_center, friend_currPos) <= ( watchArea_radius * 1609.34))
                {
                    alert_status |= false;
                }
                else
                {
                    alert_status |= true;  
                }
             }
          }
     }); 
}

function showPath()
{
     $.ajax({
             type: "POST",
             url: "showFriends.php",
             data: {
                    
                  },
             success: function(data) {
                var parsedData = JSON.parse(data);
                //displayFriends(parsedData);
                drawPath(parsedData);
                //displayFriend($lat, $lon, $user);
                }
        });
}

function  drawPath(parsedData)
{
    // Create the polyline's points
    var pathCoordinates = [];
    for (i = 0; i < parsedData.length; i++)
    {
    // Save the each  position
    pathCoordinates.push(new google.maps.LatLng(parsedData[i].latitude, parsedData[i].longitude));      
    }
    // Create the LatLngBounds object that will be used to fit the view to the points range and
    // place the markers to the polyline's points
      var latLngBounds = new google.maps.LatLngBounds();
      for(var i = 0; i < pathCoordinates.length; i++) {
      latLngBounds.extend(pathCoordinates[i]);
      // Place the marker
      new google.maps.Marker({
        map: map,
        position: pathCoordinates[i],
        title: "Point " + (i + 1)
      });
    } 
                // Define a symbol using SVG path notation, with an opacity of 1.
    var lineSymbol = {
      path: 'M 0,-1 0,1',
      strokeOpacity: 1,
      scale: 4
    };

    var path = new google.maps.Polyline({
      map: map,
      path: pathCoordinates,
      //geodesic: true,
      strokeColor: '#3333FF',
      strokeOpacity: 0,    
      icons: [{    
          icon: lineSymbol,    
          offset: '0',    
          repeat: '25px'    
        }],
    });
    for(var i = 0; i < pathCoordinates.length; i++) {
      latLngBounds.extend(pathCoordinates[i]);
  }
    map.fitBounds(latLngBounds);

    //Call map
    google.maps.event.trigger(map, 'resize');
}

function selectRightSide_menu(){
   
    var selected_profilename = selected_profile; 
   
   }
   
   function deleteFriend(){
   
        var selected_profilename = selected_profile; 
        if (confirm("Do you want to delete " + selected_profilename) == true) 
            {
             $.ajax({
                     type: "POST",
                     url: "deleteFriend.php",
                     data: {
                            username: selected_profilename
                          },
                     success: function(data) {
                     showGroup(groupname);
                        }

                });
            }
        else 
            {
                alert("You pressed Cancel!");
            } 
   }
   
    // Sets the map on all markers in the array.
      function setMapOnAll(mapObj) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(mapObj);
        }
      }

   // Removes the markers from the map, but keeps them in the array.
      function clearMarkers() {
        setMapOnAll(null);
      }
   
   // Deletes all markers in the array by removing references to them.
      function deleteMarkers() {
        clearMarkers();
        markers = [];
      }
    
   //Delete your user account from the Parent view system.

      function deleteYourAccount()
      {
            if (confirm("Do you want to delete your account?") == true) 
            {
               $.ajax({
             type: "POST",
             url: "deleteAccount.php",
             data: {
                    
                  },
             success: function(data) {
             
                }    
              });
            } 
            else 
            {
                alert("You pressed Cancel!");
            }    
      }
      
      function ShowHistory()
      {
             $.ajax({
             type: "POST",
             url: "showHistory.php",
             data: {
                   username: selected_profile
                  },
             success: function(data) {
             var parsedData = JSON.parse(data);
             drawPath(parsedData);
                }    
              });    
      }


