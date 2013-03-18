function loadNotices() {
   $.getJSON('notices.json', function(data) {
      var noticeElements = $.map(data.notices, function(notice) {
         var element = $('<li>');
         element.addClass('notice');
         element.text(notice.date + " -- " + notice.note);
         return element;
      });

      var serviceElements = $.map(data.services, function(available, service) {
         var element = $('<li>');
         var state = available === true  ? 'available' :
                     available === false ? 'unavailable' :
                                           'partial';
         var status = state === 'partial' ?  available : state;
         element.addClass('service');
         element.addClass(state);
         element.text(service + " -- " + status);
         return element;
      });

      $('#notices' ).empty().append(noticeElements);
      $('#services').empty().append(serviceElements);
      setTimeout(loadNotices, 30000);
   });
}
$(function() {
   loadNotices();
});
