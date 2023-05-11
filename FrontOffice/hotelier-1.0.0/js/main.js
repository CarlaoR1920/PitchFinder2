(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            }
        }
    });

})(jQuery);

/*REGISTER*/

function RegistarUtilizador(event) {
    event.preventDefault();
    const nome = document.querySelector("#nome");
    const email = document.querySelector("#email");
    const pass = document.querySelector("#pass");
    const passconf = document.querySelector("#passconf");
    let data = {};
    if (nome.value == null || nome.value == "") {
        alert('Por favor insira o seu nome.');
        return;
    }
    else if (email.value == null || email.value == "") {
        alert('Por favor insira o seu email.');
        return;
    } else if (pass.value == null || pass.value == "") {
        alert('Por favor insira a sua password.');
        return;
    } else if (passconf.value == null || passconf.value == "") {
        alert('Por favor insira a sua confirmacao da password.');
        return;
    }
    else if (pass.value != passconf.value) {
        alert('A password de confirmação não corresponde à password inserida\n Insira novamente!');
        return;
    }
    else {

        data["Nome"] = nome.value;
        data["Email"] = email.value;
        data["Password"] = pass.value;
        SaveDataToLocalStorageClientes(data);
        alert('Registado com sucesso!');
        window.location.href = "Login.html";
    }

}

function SaveDataToLocalStorageClientes(data) {
    let a = [];
    a = JSON.parse(localStorage.getItem("Clientes")) || [];
    a.push(data);
    localStorage.setItem("Clientes", JSON.stringify(a));
}

function Login(event) {
    event.preventDefault();
    const nome = document.querySelector("#nome");
    const pass = document.querySelector("#pass");
    let data = {};
    if (nome.value == null || nome.value == "") {
        alert('Por favor insira o seu nome.');
        return;
    }
    else if (pass.value == null || pass.value == "") {
        alert('Por favor insira a sua password.');
        return;
    }
    let a = JSON.parse(localStorage.getItem("Clientes"))

    var utilizador = a.findIndex(item => item.Nome === nome.value);
    console.log(utilizador);
    if (utilizador !== -1) {
        if (a[utilizador].Password == pass.value) {
            sessionStorage.setItem("UtilizadorLigado",JSON.stringify(a[utilizador]) )
            window.location.href = "index.html";
        } else {
            alert('A palavra-passe está incorreta.');
        }

    } else {
        alert('Este utilizador não existe.');
    }




}
