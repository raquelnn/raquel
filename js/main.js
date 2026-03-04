
// offcanvas menu close
$('.nav-link').on( "click", function(){
  $('.close').click(); 
});

// current year
    $(document).ready(function() {
    var year = new Date().getFullYear();
    $('#currentyear').text(year);
  });

  // News lLider
  if(('.hero-slider').length > 0){
      const $swiperSlides = $(".hero-slider .swiper-slide");
      const $slideInnerElements = $swiperSlides.find(".hero-slider .slide-inner");
      const INTERLEAVE_OFFSET = 0;
      const TRANSITION_SPEED = 2000;
      
      // Build menu array more efficiently
      const menu = $slideInnerElements.map((_, el) => $(el).attr("data-text")).get();
      
      // Optimized swiper configuration
      const swiperOptions = {
        loop: true,
        speed: TRANSITION_SPEED,
        parallax: true,
        autoplay: {
          delay: 6500,
          disableOnInteraction: false
        },
        watchSlidesProgress: true,
        pagination: {
          el: ".hero-slider .swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".hero-slider .swiper-button-next",
          prevEl: ".hero-slider .swiper-button-prev"
        },
        
        on: {
          progress() {
            const { slides, width } = this;
            const innerOffset = width * INTERLEAVE_OFFSET;
            
            // Use requestAnimationFrame for better performance
            requestAnimationFrame(() => {
              for (let i = 0; i < slides.length; i++) {
                const slide = slides[i];
                const slideProgress = slide.progress;
                const innerTranslate = slideProgress * innerOffset;
                const slideInner = slide.querySelector(".hero-slider .slide-inner");
                
                if (slideInner) {
                  slideInner.style.transform = `translate3d(${innerTranslate}px, 0, 0)`;
                }
              }
            });
          },
      
          touchStart() {
            // Clear transitions more efficiently
            for (let i = 0; i < this.slides.length; i++) {
              const slide = this.slides[i];
              slide.style.transition = "";
              const slideInner = slide.querySelector(".hero-slider .slide-inner");
              if (slideInner) slideInner.style.transition = "";
            }
          },
      
          setTransition(speed) {
            const transitionValue = `${speed}ms`;
            
            // Batch DOM updates
            for (let i = 0; i < this.slides.length; i++) {
              const slide = this.slides[i];
              slide.style.transition = transitionValue;
              const slideInner = slide.querySelector(".hero-slider .slide-inner");
              if (slideInner) slideInner.style.transition = transitionValue;
            }
          }
        }
      };
      
      // Initialize Swiper
      const swiper = new Swiper(".swiper-container", swiperOptions);
      
      // Optimize background image setting
      $(".hero-slider .slide-bg-image").each(function() {
        const $this = $(this);
        const backgroundUrl = $this.data("background");
        
        if (backgroundUrl) {
          $this.css("background-image", `url(${backgroundUrl})`);
        }
      });

  } 

  // Testimonial Slider
  var swiper = new Swiper(".mySwiper2", {
    slidesPerView: 3,
    spaceBetween: 24,
    loop: true,
    speed: 600,

    breakpoints: { 
      768: { slidesPerView: 1 },
      1400: { slidesPerView: 2 }
    }
  });
 
  // Back To Top
  document.addEventListener("DOMContentLoaded", function () {

    const backToTop = document.getElementById("backToTop");
    const progressCircle = document.getElementById("progressCircle");

    const radius = 45;
    const circumference = 2 * Math.PI * radius;

    // Set initial values
    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = circumference;

    function updateScrollProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Prevent divide by zero
      if (docHeight <= 0) return;

      const scrollPercent = scrollTop / docHeight;
      const offset = circumference - (scrollPercent * circumference);

      progressCircle.style.strokeDashoffset = offset;

      // Show / Hide Button with animation class
      if (scrollTop > 200) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }

      // When fully at top → reset circle
      if (scrollTop === 0) {
        progressCircle.style.strokeDashoffset = circumference;
      }
    }

    // Scroll event
    window.addEventListener("scroll", updateScrollProgress);

    // Click scroll to top
    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

  });

  // AOS Animation
  AOS.init();

  // scroll active menu change
    $('#nav_ul').onePageNav({
      currentClass: 'active',
      changeHash: false,
      scrollSpeed: 25,
      scrollThreshold: 0.5, 
      filter: '',
      easing: 'swing'
    }); 

    // Dark & Light mode
    const togButton = document.getElementById("btnSwitch");
    let currThemeMode = localStorage.getItem("dark") === "true";
    // Set initial theme
    setTheme(currThemeMode);
    togButton.addEventListener("click", () => {
      currThemeMode = !currThemeMode;
      setTheme(currThemeMode);
      localStorage.setItem("dark", currThemeMode);
    });
    function setTheme(isDark) {
      if (isDark) {
        document.documentElement.setAttribute("data-calmivelle-theme", "dark");
        togButton.innerHTML = `<i class="fa fa-sun dark-text"></i>`;
      } else {
        document.documentElement.setAttribute("data-calmivelle-theme", "light");
        togButton.innerHTML = `<i class="fa fa-moon dark-text"></i>`;
      }
    }

    // Form validate  
    $("#contactform").validate({
      rules:{
        fname:{
          required: true
        },
        lname:{
          required: true
        },
        email:{
          required: true,
          email: true
        },
        phone:{
          required: true
        },
        message:{
          required: true
        }
      },
      messages:{
       fname:{
          required: 'Please Enter Your First Name'
        },
        lname:{
         required: 'Please Enter Your Last Name'
        },
        email:{
          required:'Please Enter Your Email Address',
          email: 'Please Enter Valid Email Address'
        },
        phone:{
          required: 'Please Enter Your Phone Number'
        },
        message:{
          required: 'Please Enter Your Message'
        }
      },
      errorElement: 'div'
    });
    
    $("#newsletterform").validate({
      rules:{
        n_email:{
          required: true,
          email: true
        }
      },
      messages:{
       n_email:{
          required: 'Please Enter Your Email Address',
          email: 'Please Enter Valid Email Address'
        }
      },
      errorElement: 'div'
    });

    // Preloader
    window.addEventListener("load", function () {
      $(window).scrollTop(0);
      setTimeout(function () {
        document.querySelector(".preloader").classList.add("fade-out");
      }, 2000); // delay before fade starts
    });
    
    // Height For Preloader
    window.addEventListener("load", function () {
      $('body').addClass('preloader_height');
      setTimeout(function () {
        $('.preloader').addClass('fade-out');
        $('body').removeClass('preloader_height');
      }, 2000);
    });