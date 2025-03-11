$(document).ready(function () {
  // ----------------------- Slideshow Functions for home.html -----------------------
  let currentSlide = 0;
  const slides = $(".slide");
  let autoPlayInterval;

  function showSlide(index) {
    slides.removeClass("show").fadeOut();
    $(slides[index]).addClass("show").fadeIn();
  }

  window.changeSlide = function (direction) {
    currentSlide += direction;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    showSlide(currentSlide);
    resetAutoPlay();
  };

  function startAutoPlay() {
    autoPlayInterval = setInterval(function () {
      changeSlide(1);
    }, 5000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }

  showSlide(currentSlide);
  startAutoPlay();

  // ----------------------- Timeline Functions for interactive.html -----------------------
  const timelineData = {
    "1800s": {
      image: "dead-man-handle.jpg",
      text: "Granville T. Woods patented railway telegraphs that improved train safety.",
    },
    "1900s": {
      image: "boykin-resistor-invention.png",
      text: "Otis Boykin developed electronic control devices used in pacemakers.",
    },
    "1970s": {
      image: "data-wrangler.png",
      text: "Valerie Thomas invented the Illusion Transmitter, still used in 3D imaging today.",
    },
    "1990s": {
      image: "picture-of-gif.png",
      text: "Lisa Gelobter contributed to web animation technology, including early GIFs.",
    },
    "2000s": {
      image: "ayanna-howard-phd.png",
      text: "Dr. Ayanna Howard advanced robotics and AI, influencing autonomous systems.",
    },
  };

  $("#timeline-key tr").click(function () {
    var year = $(this).attr("data-year");

    if (timelineData[year]) {
      let position = {
        "1800s": "10%",
        "1900s": "30%",
        "1970s": "50%",
        "1990s": "70%",
        "2000s": "90%",
      }[year];

      $("#timeline-arrow").animate({ left: position }, 1000);

      $("#gallery-image").fadeOut(300, function () {
        $(this).attr("src", timelineData[year].image).fadeIn(300);
      });
      $("#gallery-text").fadeOut(300, function () {
        $(this).text(timelineData[year].text).fadeIn(300);
      });
    }
  });

  // ----------------------- Contact Form Logic -----------------------
  function resetForm() {
    $("#form-container").html(`
      <form id="feedback-form">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        
        <label for="message">Message:</label>
        <textarea id="message" name="message" required></textarea>
        
        <button type="submit">Submit</button>
      </form>
    `);
  }

  resetForm();

  $("#contact-btn").click(function () {
    if (
      $("#form-container").is(":hidden") ||
      $("#form-container").text().includes("Thank you")
    ) {
      resetForm();
    }
    $("#form-container").toggle();
  });

  $(document).on("submit", "#feedback-form", function (event) {
    event.preventDefault();

    let formData = $(this).serialize();

    $.ajax({
      url: "https://formspree.io/f/xrbeorwj",
      method: "POST",
      data: formData,
      dataType: "json",
      success: function () {
        $("#form-container")
          .html(
            "<p>Thank you for your feedback! We'll get back to you shortly.</p>"
          )
          .fadeIn();
      },
    });
  });
});
