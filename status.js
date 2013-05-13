$(function() {

var usingExampleNotices = false;

function loadNotices() {
   _.templateSettings = {
      escape: /\{([^}]+)\}/
   };

   var filename = usingExampleNotices ? 'notices.json.example' : 'notices.json';

   function onSuccess(data) {
      var noticeTemplate   = getTemplate('noticeTemplate');
      var dateTemplate     = getTemplate('dateTemplate');
      var lastDate = null;
      var noticeElements = []
      $.each(data.notices, function(index, notice) {
         var date = new Date(notice.date);
         notice.date = formatDate(date);
         notice.time = formatTime(date);
         if (notice.date !== lastDate) {
            noticeElements.push(dateTemplate(notice));
            lastDate = notice.date;
         }
         noticeElements.push(noticeTemplate(notice));
      });
      $('#notices').empty().append(noticeElements);

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
   }

   $.ajax({
      dataType: "json",
      url: filename,
      success: onSuccess,
      error: function(jqXHR) {
         if (jqXHR.status == 404 && !usingExampleNotices) {
            usingExampleNotices = true;
            loadNotices();
         }
      }
   });

   function getTemplate(elementID) {
      var template = _.template($('#' + elementID).html());
      return function() {
         return template.apply(this, arguments);
      }
   }

   function formatDate(date) {
      function pad(n) { return n < 10 ? '0' + n : n }
      return date.getFullYear() + '-'
         + pad(date.getMonth() + 1) + '-'
         + pad(date.getDate());
   };

   function formatTime(date) {
      function pad(n) { return n < 10 ? '0' + n : n }
      return pad((date.getHours()+11)%12+1) + ':'
         + pad(date.getMinutes()) + ':'
         + pad(date.getSeconds()) + ' '
         + (date.getHours() >= 12 ? 'PM' : 'AM');
   };
}
   loadNotices();
});
