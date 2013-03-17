function loadNotices() {
   $.getJSON('notices.json', function(data) {
      var noticeElements = [];
      console.log(data);
      $.each(data.notices, function(index, notice) {
         console.log(notice);
         var element = $('<li>');
         element.addClass('notice');
         element.text(notice.date + " -- " + notice.note);
         // Do something with services state
         noticeElements.push(element);
      });
      $('#notices').empty().append(noticeElements);
      setTimeout(loadNotices, 30000);
   });
}
$(function() {
   loadNotices();
});
