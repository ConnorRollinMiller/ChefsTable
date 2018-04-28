//Script for index.html

/* ======================================================
                  Testimonial SLider
====================================================== */

var slideIndex = 1;
showDivs(slideIndex);

function plusSlide(n) {
   showDivs(slideIndex += n);
}

function minusSlide(n) {
   showDivs(slideIndex += n);

}

function currentSlide(n) {
   showDivs(slideIndex = n);
}

function showDivs(n) {
   var i;
   var slides = document.getElementsByClassName("mySlides");
   var dots = document.getElementsByClassName("dots");

   if (n > slides.length) {
      slideIndex = 1;
   }
   if (n < 1) {
      slideIndex = slides.length;

   }
   for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
   }
   for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace("white", "");
   }
   slides[slideIndex - 1].style.display = "flex";
   dots[slideIndex - 1].className += " white";
}


/* ======================================================
                     Shopping Cart
====================================================== */


function cartFunction() {

   var addToCartBtn = document.getElementsByClassName("add-button-icon");
   var cartTotalItems = document.getElementById("cart-item-number");
   var cartPrice = document.getElementById("cart-price");
   var cart = [];

   for (var i = 0, len = addToCartBtn.length; i < len; i++) {

      (function(index) {
         addToCartBtn[i].onclick = function() {
            var itemNames = document.getElementsByClassName("item-name");
            var itemPrices = document.getElementsByClassName("price");
            var itemImgs = document.getElementsByClassName("item-picture");

            addItemToCart(itemNames[index], itemPrices[index], itemImgs[index], 1);
            displayCart();

         }
      })(i);

   }

   for (var i in addToCartBtn.length) {
      addToCartBtn[i].onclick = function() {
         addItemToCart(itemNames[addToCartBtn.indexOf(i)], itemPrices, itemImgs, 1);
         displayCart();
      };
   }

   function displayCart() {
      var cartArray = listCart();
      var output = "";
      for (var i in cartArray) {
         output += "<h5 class=\"item-name\">" + cartArray[i].name + "</h5>";
      }
      document.getElementById("cart-dropdown-menu-container").innerHTML = output;
   }

   //Shopping cart functions
   var itemObj = function(name, price, image, count) {
      this.name = name;
      this.price = price;
      this.image = image;
      this.count = count;
   };

   // Adds item and properties to cart
   function addItemToCart(name, price, image, count) {

      for (var i in cart) {
         if (cart[i].name === name) {
            cart[i].count += count;
            return;
         }
      }
      var item = new itemObj(name, price, image, count);
      cart.push(item);
      saveCart();
   }

   // Removes one item
   function removeItemFromCart(name) {
      for (var i in cart) {
         if (cart[i].name === name) {
            cart[i].count--;
            if (cart[i].count <= 0) {
               cart.splice(i, 1);
            }
            break;
         }
      }
      saveCart();
   }

   //removes ALL of ONE item from cart
   function removeItemFromCartAll(name) {
      for (var i in cart) {
         if (cart[i].name === name) {
            cart.splice(i, 1);
            break;
         }
      }
      saveCart();
   }

   //remove EVERYTHING from cart
   function clearCart() {
      cart = [];
      saveCart();
   }

   // Count total number of items in cart
   function countCart() {
      totalCount = 0;
      for (var i in cart) {
         totalCount += cart[i].count;
      }
      return totalCount;
   }

   //counts total price of cart - totalCart() --> Returns total cost
   function totalCartCost() {
      totalCost = 0
      for (var i in cart) {
         totalCost += cart[i].price;
      }
      return totalCost
   }

   //Create's a copy of 'cart' to a new variable (function 'listCart()') to move this from project to projoect
   function listCart() {
      var cartCopy = [];
      for (var i in cart) {
         var item = cart[i];
         var itemCopy = {};
         for (var property in item) {
            itemCopy[property] = item[property];
         }
         cartCopy.push(itemCopy);
      }
      return cartCopy;
   }

   // Saves the cart to local storage
   // SAVE CART EVERTIME WE CHANGE CART
   function saveCart() {
      localStorage.setItem("shoppingCart", JSON.stringify(cart)); //JSON converts cart from 'objects' IN list to a JSON 'string'
   }

   // GO TO: 'inspect' web page > under navigate where 'Console' is GO TO 'Application' > 'Storage' (Left Side Nav) > 'Local Storage'
   // Have stored the 'cart' list to the browser's local storage EX: localStorage.setItem("Username", "Cmillz_21");  OR  localStorage.setItem("Age", "21");

   // Loads the saved 'cart' from local storage - User can leave and come back with items in cart - Also, saves cart when User moves from page to page
   function loadCart() {
      cart = JSON.parse(localStorage.getItem("shoppingCart")); // Coverts from JSON 'string' to 'array' / 'list'
   }

   loadCart();

   var array = listCart();
   console.log(array);
   console.log(addToCartBtn);

}

cartFunction();

/*======================================================
                        JQuery
====================================================== */
$(document).ready(function() {

   /* ======================================================
                           Site Banner
   ====================================================== */
   $(function() {

      var slideContainer = $(".carousel-inner");
      var totalSlides = slideContainer.children().length;
      var slideWidth = 100.0 / totalSlides;
      var slideIndex = 0;
      var firstSlide = slideContainer.find("div:first-child");
      var lastSlide = slideContainer.find("div:last-child");

      slideContainer.css("margin-left", "-100%");
      lastSlide.clone().prependTo(slideContainer);
      firstSlide.clone().appendTo(slideContainer);
      slideContainer.find(".slides").each(function() {
         var percentLeft = (slideWidth * slideIndex) + "%";
         $(this).css({
            "left": percentLeft
         });
         $(this).css({
            width: (100 / (totalSlides - 2)) + "%"
         });
      });
      $("#btn-prev").click(function(event) {
         event.preventDefault();
         slide(slideIndex - 1);
      });

      $("#btn-next").click(function(event) {
         event.preventDefault();
         slide(slideIndex + 1);
      });

      function slide(newSlideIndex) {

         var marginLeftPercent = (newSlideIndex * (-100) - 100) + "%";

         slideContainer.animate({
            "margin-left": marginLeftPercent
         }, 800, function() {

            if (newSlideIndex < 0) {
               slideContainer.css("margin-left", ((totalSlides) * (-100)) + "%");
               newSlideIndex = totalSlides - 1;
            } else if (newSlideIndex >= totalSlides) {
               slideContainer.css("margin-left", "-100%");
               newSlideIndex = 0;
            }
            slideIndex = newSlideIndex;
         });
      }
   });

   /* ======================================================
                        Smooth Scroll
   ====================================================== */
   $('a[href*="#"]')
      // Remove dummy links
      .not('[href="#"]')
      .not('[href="#0"]')
      .click(function(event) {
         // On-page links
         if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname
         ) {
            // Element to scroll to
            var section = $(this.hash);
            section = section.length ? section : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll section exist?
            if (section.length) {
               // Only prevent default if click function happens
               event.preventDefault();
               $('html, body').animate({
                  scrollTop: section.offset().top
               }, 1000, function() {

                  // Callback after animation
                  // Must change focus!
                  var $section = $(section);
                  $section.focus();
                  if ($section.is(":focus")) { // Checking if the section was focused
                     return false;
                  } else {
                     $section.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                     $section.focus(); // Set focus again
                  }
               });
            }
         }
      });

   /* ======================================================
                  Click to scroll to top
   ====================================================== */
   $('.logo').click(function() {
      $('html, body').animate({
         scrollTop: 0
      }, 700);
      return false;
   });

   /* ======================================================
         Shrink when view port is > 100 from top
   ====================================================== */

   $(document).scroll(function() {
      if ($(document).scrollTop() > 40) {
         $('header').removeClass('header-big-height').addClass('header-small-height');
         /* REPLACED WITH CSS HEIGHT PROPERTY ===> $('.logo').removeClass('big-logo').addClass('small-logo');*/
      } else {
         $('header').removeClass('header-small-height').addClass('header-big-height');
         /* $('.logo').removeClass('small-logo').addClass('big-logo'); */
      }

      //get document scroll position
      var position = $(document).scrollTop();
      //get header height
      var header = $('header').outerHeight();

      //check active section
      $('section').each(function(i) {
         if ($(this).position().top <= (position + header)) {
            $("a.active").removeClass('active');
            $("a").eq(i - 1).addClass('active');
         }
      });
      var scrollPos = $(this).scrollTop();
      $('.slider-text').css({
         'top': ((scrollPos * /*EVEN WITH SCROLL =====> 0.125 */ 0.17 + 50)) + '%',
      });
   });

   /* ======================================================
                        Mobile Menu
   ====================================================== */

   $("#mobile-menu-open").click(function() {
      $("nav").animate({
         "left": 0
      }, 500);
      $("#mobile-menu-open").removeClass("display").addClass("hidden");
      $("#mobile-menu-close").removeClass("hidden").addClass("display");
      $("header").addClass("bg-none");
      $("#cart-container").addClass("hidden").removeClass("display");

   });

   $("#mobile-menu-close").click(function() {
      $("nav").animate({
         "left": -100 + "%"
      }, 500);
      $("#mobile-menu-open").removeClass("hidden").addClass("display");
      $("#mobile-menu-close").removeClass("display").addClass("hidden");
      $("header").removeClass("bg-none");
      $("#cart-container").addClass("display").removeClass("hidden");
   });


});

/* ======================================================
                  Google Map API
====================================================== */

function initMap() {
   // Styles a map in night mode.
   var map = new google.maps.Map(document.getElementById('map'), {
      center: {
         lat: 44.978159,
         lng: -93.273979

      },
      zoom: 15,
      styles: [{
            elementType: 'geometry',
            stylers: [{
               color: '#242f3e'
            }]
         },
         {
            elementType: 'labels.text.stroke',
            stylers: [{
               color: '#242f3e'
            }]
         },
         {
            elementType: 'labels.text.fill',
            stylers: [{
               color: '#746855'
            }]
         },
         {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{
               color: '#d59563'
            }]
         },
         {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{
               color: '#d59563'
            }]
         },
         {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{
               color: '#263c3f'
            }]
         },
         {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{
               color: '#6b9a76'
            }]
         },
         {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{
               color: '#38414e'
            }]
         },
         {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{
               color: '#212a37'
            }]
         },
         {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{
               color: '#9ca5b3'
            }]
         },
         {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{
               color: '#746855'
            }]
         },
         {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{
               color: '#1f2835'
            }]
         },
         {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{
               color: '#f3d19c'
            }]
         },
         {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{
               color: '#2f3948'
            }]
         },
         {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{
               color: '#d59563'
            }]
         },
         {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{
               color: '#17263c'
            }]
         },
         {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{
               color: '#515c6d'
            }]
         },
         {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{
               color: '#17263c'
            }]
         }
      ]
   });
}
