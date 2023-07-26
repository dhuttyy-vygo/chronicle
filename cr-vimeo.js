$("[js-vimeo-element='component']").each(function (index) {
  let componentEl = $(this),
    coverEl = $(this).find("[js-vimeo-element='cover']");

  let relatedPopupVideo = $(".popup_item").eq(index);
  let iframeEl = relatedPopupVideo.find("iframe");
  let closePop = $(".cccc.is-popup");

  iframeEl.attr("preload", "auto"); // Set the preload attribute to "auto"

  let player = new Vimeo.Player(iframeEl[0]);

  player.on('bufferstart', function () {
    let playingCover = $("[js-vimeo-element='component'].is-playing").not(componentEl).find(" [js-vimeo-element='cover']");
    if (playingCover.length) playingCover[0].click();
    componentEl.addClass("is-playing");
  });

  player.on('play', function () {
    let playingCover = $("[js-vimeo-element='component'].is-playing").not(componentEl).find(" [js-vimeo-element='cover']");
    if (playingCover.length) playingCover[0].click();
    componentEl.addClass("is-playing");
  });

  player.on("pause", function () {
    componentEl.removeClass("is-playing");
  });

  closePop.on("click", function () {
    player.pause();
  });

  coverEl.on("click", function () {
    if (componentEl.hasClass("is-playing")) {
      player.pause();
    } else {
      player.play();
    }
  });
});
