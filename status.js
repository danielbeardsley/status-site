function loadNotices() {
   _.templateSettings = {
      escape: /\{([^}]+)\}/
   };

   $.getJSON('notices.json', function(data) {
      var noticeElements = $.map(data.notices, function(notice) {
         var element = $('<li>');
         element.addClass('notice');
         element.text(notice.date + " -- " + notice.note);
         return element;
      });

      var serviceTemplate = _.template('\
      <li class="service {state}">\
         <span class="name">{name}</span>\
         <span class="state">{info}</span>\
      </li>');

      var serviceElements = $.map(data.services, function(available, serviceName) {
         var service = {
            name:  serviceName,
            state: available === true  ? 'available' :
                   available === false ? 'unavailable' :
                                         'partial',
            info:  available === true  ? 'available' :
                   available === false ? 'unavailable' :
                                         available
         }
         service.info = service.state
         return $.parseHTML(serviceTemplate(service));
      });

      $('#notices' ).empty().append(noticeElements);
      $('#services').empty().append(serviceElements);
      setTimeout(loadNotices, 30000);
   });
}
$(function() {
   loadNotices();
});
