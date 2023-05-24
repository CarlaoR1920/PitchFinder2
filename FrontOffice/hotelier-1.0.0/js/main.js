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
    //let data2 = {};
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
        data["Tipo"] = "Cliente"
        SaveDataToLocalStorageClientes(data);
        /*data2["Nome"] = "Admin";
        data2["Email"] = "Admin@adm.com";
        data2["Password"] = "Admin";
        data2["Tipo"] = "Admin"
        SaveDataToLocalStorageClientes(data2);*/
        alert('Registado com sucesso!');
        window.location.href = "Login.html";
    }

}

function SaveDataToLocalStorageClientes(data) {
    let a = [];
    a = JSON.parse(localStorage.getItem("Utilizadores")) || [];
    a.push(data);
    localStorage.setItem("Utilizadores", JSON.stringify(a));
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
    let a = JSON.parse(localStorage.getItem("Utilizadores"))

    var utilizador = a.findIndex(item => item.Nome === nome.value);
    if (utilizador !== -1) {
        if (a[utilizador].Password == pass.value) {
            sessionStorage.setItem("UtilizadorLigado", JSON.stringify(a[utilizador]))
            window.location.href = "index.html";
        } else {
            alert('A palavra-passe está incorreta.');
        }

    } else {
        alert('Este utilizador não existe.');
    }
}

const CamposDisponiveis = new Vue({
    el: '#ola',
    data: {
        items: [],
        Localizacoes: []
    },
    mounted() {
        const data = localStorage.getItem('Campos');
        if (data) {
            const parsedData = JSON.parse(data);
            this.items = parsedData;
            this.Localizacoes = this.items;
        }
    },
    methods: {
        hello() {
            const select = document.getElementById("SelectLocalizacao");
            const campos = localStorage.getItem('Campos');
            const camposJ = JSON.parse(campos);
            let a = [];
            for (let i = 0; i < camposJ.length; i++) {
                if (camposJ[i].Localizacao === select.value) {
                    a.push(camposJ[i]);
                }
            }

            this.items = a;
        },
        ReservasCampo(item) {
            sessionStorage.setItem("CampoEscolhido", JSON.stringify(item));
            window.location.href = "service.html";

        },
    },

});

const CampoaReservar = new Vue({
    el: '#tatudo',
    data: {
        imagem: "",
    },
    mounted() {
        const data = sessionStorage.getItem('CampoEscolhido');
        const dados = JSON.parse(data);
        this.imagem = dados.Imagem;
        console.log(dados.Imagem);
        console.log(this.imagem);
    },

});

function confirmar(x,y) {
    document.getElementById('modal123').style.display = 'block';
    document.getElementById('overlay123').style.display = 'block';
}
 
function fecharconf() {
    document.getElementById('modal123').style.display = 'none';
    document.getElementById('overlay123').style.display = 'none';
  }

  