var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];

function getStreams(name, callback) {
  $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + name + '?callback=?', function(data) {
    //console.log(data);
    callback(data);
  });
}


function getUsers(name, callback) {
    $.getJSON('https://wind-bow.gomix.me/twitch-api/users/' + name + '?callback=?', function(data) {
    // console.log(data);
    callback(data);
  });
}

function getChannels(name) {
    $.getJSON('https://wind-bow.gomix.me/twitch-api/channels/' + name + '?callback=?', function(data) {
    // console.log(data);
  });
}

function loop() {
  $.each(streamers, function(index, value) {
    // console.log(value);
    $.when(
      $.getJSON('https://wind-bow.gomix.me/twitch-api/channels/' + value + '?callback=?'),
      $.getJSON('https://wind-bow.gomix.me/twitch-api/users/' + value + '?callback=?'),
      $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + value + '?callback=?')
      ).done(function(channels, users, streams) {
        //create html by appending to main class

      
        var channel_name = channels[0].display_name;
        var channel_status = channels[0].status;
        var channel_url = channels[0].url;
        var channel_views = channels[0].views;
        var channel_followers = channels[0].followers;
        
        var invalid_class = "";
        var visibility_class = "";
        var stream_game_visibility = "";
        var channel_status_visibility = "";
        var stream_viewers_visibility = "";
      
        if (channels[0].name === undefined) {
          channel_name = value + " is an invalid user or deleted account";
          visibility_class = "hidden";
        }
      
        if (channels[0].url === undefined) {
          channel_url = "Not available";
          channel_views = "Not available";
          channel_followers = "Not available";
          channel_status = "Not available";
          invalid_class = "invalid";
        }
      
        if (channels[0].status === null) {
          channel_status = "blank";
        }
        
       
        var stream_game;
        var stream_viewers;
        

      
        if (streams[0].stream !== null) {
          invalid_class = "streaming";
          if (streams[0].stream.game != "") {
             stream_game = streams[0].stream.game;
          } else {
            stream_game = "something.";
          }
          stream_viewers = streams[0].stream.viewers;
        } else {
          stream_game = "nothing.";
        }
      
        if (stream_viewers === undefined) {
          stream_viewers = "No viewers";
          stream_viewers_visibility = "hidden";
          
        }
      
        if (stream_game == "nothing.") {
          stream_game_visibility = "hidden";
        }
      
        if (channel_status == "blank" || channel_status == "Not available") {
          channel_status_visibility = "hidden";
        }
      
        
      
        $(".main").append(
          "<div class='entry " + invalid_class + "'>" +
          "<span class='channel-name cname'>" + channel_name + "</span>" + 
          "<span class='stream-game game " + stream_game_visibility + "'> is playing " + stream_game + "</span>" +
          "<div class='stream-viewers " + stream_viewers_visibility + "'>" + stream_viewers + " watching</div>" +
          "<div class='channel-status " + channel_status_visibility + "'><a href=" + channel_url + ">" + channel_status + "</a></div>" + 
          "<div class='channel-info " + visibility_class + "'><span class='channel-info-span'>Channel Info</span><br><div class='channel-url'> <a href='" + channel_url + "'>Go to Channel</a></div>" +  
          "<div class='channel-views " + visibility_class + "'>" + channel_views + " views</div>" +
          "<div class='channel-followers " + visibility_class + "'>" + channel_followers + " followers</div>" +
          "</div></div>"
                    
        );
    })
  });
}

loop();

$('input').on("click", function() {
  if ($('.av').is(':checked')) {
    $('.entry').removeClass('hidden');
    $('.entry.invalid').addClass('hidden');
    $('.entry.streaming').addClass('hidden');
  }
  if ($('.un').is(':checked')) {
    $('.entry').addClass('hidden');
    $('.entry.invalid').removeClass('hidden');
  }
  if ($('.st').is(':checked')) {
    $('.entry').addClass('hidden');
    $('.entry.streaming').removeClass('hidden');
  }
  if ($('.al').is(':checked')) {
    $('.entry').removeClass('hidden');
  }
})