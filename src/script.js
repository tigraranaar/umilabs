(function () {
    var form = document.querySelector('.write__form'),
        userName = document.getElementById('name'),
        userEmail = document.getElementById('email'),
        userPhone = document.getElementById('phone'),
        inputs = form.querySelectorAll('input');

    var regExps = {
        regName: /^[\D]+$/,
        regEmail: /^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/,
        regPhone: /^((8|\+7)[\- ]?)?(\(?\d{3,4}\)?[\- ]?)?[\d\- ]{5,10}$/
    };

    /* переводим валидацию формы полностью на js */
    form.setAttribute('novalidate', 'true');

    /* создание сообщения об ошибке */
    function createErrorMessage(elem) {
        var errorExists = elem.parentElement.querySelector('.input-field__error-tip');

        if (!errorExists) {
            var errorTip = document.createElement('p');
            elem.parentElement.appendChild(errorTip);
            errorTip.classList.add('input-field__error-tip');
            errorTip.textContent = 'Поле ' + elem.id + ' не заполнено, либо содержит недопустимые символы';

            elem.addEventListener('input', onInputRemoveErrorTip);
        }
    }

    /* обработчик фокуса на поле, удаление сообщения об ошибке (при его наличии) */
    function onInputRemoveErrorTip(evt) {
        var errorExists = evt.target.parentElement.querySelector('.input-field__error-tip');

        if (errorExists) {
            evt.target.parentElement.removeChild(errorExists);
        }
        this.removeEventListener('input', onInputRemoveErrorTip);
    }

    /* обработчик ухода фокуса с поля, проверка заполнения */
    function onBlurCheckField(evt) {

        switch (evt.target) {
            case userName:
                if (evt.target.value === '' || !evt.target.value.match(regExps.regName)) {
                    createErrorMessage(evt.target);
                }
                break;
            case userEmail:
                if (evt.target.value === '' || !evt.target.value.match(regExps.regEmail)) {
                    createErrorMessage(evt.target);
                }
                break;
            case userPhone:
                if (evt.target.value === '' || !evt.target.value.match(regExps.regPhone)) {
                    createErrorMessage(evt.target);
                }
                break;
        }
    }

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('blur', onBlurCheckField);
    }

    /* обработчик отправки формы */
    form.addEventListener('submit', function (evt) {

        if (!userName.value || !userName.value.match(regExps.regName)) {
            evt.preventDefault();
            createErrorMessage(userName);
        }

        if (!userEmail.value || !userEmail.value.match(regExps.regEmail)) {
            evt.preventDefault();
            createErrorMessage(userEmail);
        }
        if (!userPhone.value || !userPhone.value.match(regExps.regPhone)) {
            evt.preventDefault();
            createErrorMessage(userPhone);
        }
    });

    /* анимация */

    var wow = new WOW({mobile: false});
    wow.init();

})();
