$(document).ready(function () {
    // Manipulação do formulário de edição de hotel
    $('#edit-form').on('submit', function (event) {
        event.preventDefault(); // Previne o envio padrão do formulário
        const formData = $(this).serializeArray();
        const dataObject = {};
        formData.forEach(item => {
            dataObject[item.name] = item.value;
        });

        const hotelId = $(this).find('input[name="id"]').val();

        $.ajax({
            url: `/api/hoteis/${hotelId}`,
            type: 'PUT',
            contentType: 'application/json', // Define o tipo de conteúdo como JSON
            data: JSON.stringify(dataObject), // Converte os dados em JSON
            success: function () {
                window.location.href = `/hoteis/${hotelId}`; // Redireciona para a página de detalhes do hotel após edição
            },
            error: function (xhr, status, error) {
                alert("Erro ao editar hotel: " + error);
            }
        });
    });

    // Manipulação do formulário de edição de cliente
    $('#edit-client-form').on('submit', function (event) {
        event.preventDefault(); // Previne o envio padrão do formulário
        const formData = $(this).serializeArray();
        const dataObject = {};
        formData.forEach(item => {
            dataObject[item.name] = item.value;
        });

        const clientId = $(this).find('input[name="id"]').val();

        $.ajax({
            url: `/api/clientes/${clientId}`,
            type: 'PUT',
            contentType: 'application/json', // Define o tipo de conteúdo como JSON
            data: JSON.stringify(dataObject), // Converte os dados em JSON
            success: function () {
                window.location.href = `/clientes/${clientId}`; // Redireciona para a página de detalhes do cliente após edição
            },
            error: function (xhr, status, error) {
                alert("Erro ao editar cliente: " + error);
            }
        });
    });

    // Função para definir o tema
    function setTheme(theme) {
        document.cookie = "theme=" + theme + "; path=/";
        if (theme === 'dark') {
            $('body').addClass('dark-theme').removeClass('light-theme');
        } else {
            $('body').addClass('light-theme').removeClass('dark-theme');
        }
    }

    // Função para obter o tema do cookie
    function getThemeFromCookie() {
        const name = "theme=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArr = decodedCookie.split(';');
        for (let i = 0; i < cookieArr.length; i++) {
            let cookie = cookieArr[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return "light"; // Valor padrão
    }

    // Inicializa o tema com base no cookie
    setTheme(getThemeFromCookie());

    // Evento para alternar o tema
    $('#toggle-theme').on('click', function () {
        const currentTheme = getThemeFromCookie();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // Manipulação do botão de exclusão de hotel
    $(document).on('click', '.delete-hotel-button', function () {
        const hotelId = $(this).data('id'); // Obtém o ID do hotel do atributo data-id
        if (confirm('Você tem certeza que deseja excluir este hotel?')) {
            $.ajax({
                url: `/api/hoteis/${hotelId}`, // Insere o ID do hotel na URL
                type: 'DELETE',
                success: function () {
                    window.location.href = '/hoteis'; // Redireciona para a lista de hotéis após exclusão
                },
                error: function (xhr, status, error) {
                    alert("Erro ao excluir hotel: " + error);
                }
            });
        }
    });

    $.ajax({
        url: `/api/hoteis/${hotelId}`, // Adicionando aspas simples para envolver a URL
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(dataObject),
        success: function () {
            window.location.href = `/hoteis/${hotelId}`;
        },
        error: function (xhr, status, error) {
            alert("Erro ao editar hotel: " + error);
        }
    });


    // Manipulação do botão de exclusão de cliente
    $(document).on('click', '.delete-client-button', function () {
        const clientId = $(this).data('id'); // Obtém o ID do cliente do atributo data-id
        if (confirm('Você tem certeza que deseja excluir este cliente?')) {
            $.ajax({
                url: `/api/clientes/${clientId}`, // Insere o ID do cliente na URL
                type: 'DELETE',
                success: function () {
                    window.location.href = '/clientes'; // Redireciona para a lista de clientes após exclusão
                },
                error: function (xhr, status, error) {
                    alert("Erro ao excluir cliente: " + error);
                }
            });
        }
    });
});
