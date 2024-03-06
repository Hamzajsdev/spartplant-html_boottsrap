$(function () {

    // AOS scroll animation
    AOS.init({
        once: true
    });

    // Scroll to anchor
    $('.nav-list a').on('click' , function(e){
        e.preventDefault();

        // close menu modal if click on link in menu
        $('#menuModal').modal('hide');

        var target = $(this).attr('href');
        $('html , body').animate({scrollTop: $(target).offset().top} , 300); // scroll to anchor

    });


    // Team slider
    $('.team').slick({
        infinite: true,
        arrows: false,
        dots: false,
        variableWidth: true,
        autoplay: true,
        pauseOnHover: false,
        pauseOnFocus: false,
        touchThreshold: 9,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1
            }
          }
        ]
    });

    // SVG animation
    // Line animation
    if ( $('#line').length != 0 ) {
        const myLine = new Vivus('line', {duration: 300 , start: 'manual'});

        const offsetScreen = 400;
        const offset = $('.we-create').offset().top - offsetScreen;
        $(window).on('scroll' , function(){

            if ($(window).scrollTop() > offset) {
                myLine.play(0);
            }

        });
    }

    // Process animation
    if ( $('#lineProcess').length != 0 ) {
        const myProcess = new Vivus('lineProcess', {duration: 300 , start: 'manual'});

        //const offsetScreen = 400;
        const offsetProcess = $('.our-approach').offset().top;
        $(window).on('scroll' , function(){

            if ($(window).scrollTop() > offsetProcess) {
                myProcess.play(0);
            }

        });
    }

});

// Initialize EmailJS with your user ID (replace YOUR_USER_ID with your actual user ID)
emailjs.init('mv6WviUdklxYjt26-');

// Get the form element by its ID
const contactForm = document.getElementById('contact-form');
const submitButton = document.getElementById('submitme');

// Define minimum length requirements for input fields
const minLengths = {
    name: 2,
    lastname: 2,
    email: 5,
    message: 10
};

// Function to validate input lengths
function validateInputLengths(formData) {
    console.log(formData);
    for (const fieldName in minLengths) {
        if (formData[fieldName].length < minLengths[fieldName]) {
            return {
                valid: false,
                errorMessage: `The ${fieldName} field must be at least ${minLengths[fieldName]} characters long.`
            };
        }
    }
    return { valid: true };
}

// Attach a submit event listener to the form
submitButton.addEventListener('click', (event) => {
    // Prevent the default form submit action
    event.preventDefault();

    // Get form data
    const formData = Object.fromEntries(new FormData(contactForm).entries());

    // Validate input lengths
    const validationResult = validateInputLengths(formData);
    console.log(validationResult);
    if (!validationResult.valid) {
        $('.error .warning').text(validationResult.errorMessage);
        $('.error').removeClass('d-none');
        return;
    }

    // Send the form data using EmailJS
    emailjs.sendForm('service_0flx88l', 'template_pdr73ww', contactForm)
        .then((result) => {
            // Handle success: show an alert, clear the form, or redirect the user
            console.log('Email sent successfully:', result.text);
            $('.success-content').removeClass('d-none');
            $('.error').addClass('d-none');
            $('#contact-form').addClass('d-none');
            contactForm.reset();
        }, (error) => {
            // Handle error: show an alert or display an error message
            console.error('Email sending failed:', error);
            alert('Email sending failed: ' + error.text);
        });
});

