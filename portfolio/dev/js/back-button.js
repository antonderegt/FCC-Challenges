window.onbeforeunload = function() {
  console.log('backing up!')
  return "You will  leave this page";
};
