function loadNotices() {
   _.templateSettings = {
      escape: /\{([^}]+)\}/
   };

   $.getJSON('notices.json', function(data) {
      var noticeTemplate = getTemplate('noticeTemplate');
      var noticeElements = $.map(data.notices, function(notice) {
         return noticeTemplate(notice);
      });
      $('#notices' ).empty().append(noticeElements);

      var serviceTemplate = getTemplate('serviceTemplate');
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
         return serviceTemplate(service);
      });
      $('#services').empty().append(serviceElements);

      setTimeout(loadNotices, 30000);
   });

   function getTemplate(elementID) {
      var template = _.template($('#' + elementID).html());
      return function() {
         return template.apply(this, arguments);
      }
   }
}
$(function() {
   loadNotices();
});
