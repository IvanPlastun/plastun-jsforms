$(document).ready(function() {

	let checkRegistrationForm = (function() {

		data = {
			email: 'mail@mail.com',
			password: 123
		}
		//Инициализация модуля
		let init = function() {
			_setUpListeners();
		}

		//Слушатель событий модуля
		let _setUpListeners = function() {
			$('#reg-form').on('submit', _validateForm);
		}

		let _validateForm = function(event) {
			let notifications = {
				emptyEmail: 'Введите email',
				emptyPassword: 'Введите пароль',
				wrongFormatEmail: 'Неверный формат email',
				busyEmailAndPassord: 'Поля Email и пароль обязательны для заполнения',
				emailBusyMessage: $('<div class="notify no-radius-bottom notify--error">Данный email уже занят</div><div class="notify no-radius-top"><p>Используйте другой email чтобы создать новый аккаунт.</p><p> Или воспользуйтесь<a href="#!">восстановлением пароля </a>, чтобы войти на сайт.</p></div>')
			}

			let form = $(this),
				inputs = form.find('input'),
				selectInputMail = $('#fieldEmailReg'),
				selectInputPassword = $('#fieldPasswordReg'),
				email = inputs[0].value.trim(),
				password = inputs[1].value.trim(),
				notifyBox = $('<div class="notify no-paddings"></div>'),
				pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z{2,4}\.])?[a-z]{2,4}$/i;

			//Переменные для нотификаций
			let notifyEmptyMail,
				notifyEmptyPassword,
				notifyIncorrectEmail;

			let createNotify = function(notifyBox, classes, notifyObject, removeClasses) {
				let notifyblock;
				if(removeClasses != undefined) {
					notifyblock = notifyBox.removeClass(removeClasses).addClass(classes).text(notifyObject);
				} else {
					notifyblock = notifyBox.addClass(classes).text(notifyObject);
				}
				return notifyblock;
			}

			let insertNotify = function(position, notifyContent, selector) { 
				switch(position) { 
					case "before":
						notifyContent.insertBefore(selector);
					break;
					case "after":
						notifyContent.insertAfter(selector);
					break;
				}
			}

			let deleteNotify = function() {
				form.find('.notify').remove();
			}

			if(email.length != 0) {
				deleteNotify();

				if(pattern.test(email)) {
					deleteNotify();

					if(password.length != 0) {
						deleteNotify();

						if(email != data.email) {
							deleteNotify();
							form.submit();
						} else {
							event.preventDefault();
							deleteNotify();
							notifyBox.html(notifications.emailBusyMessage);
							insertNotify('before', notifyBox, selectInputMail);
						}

					} else {
						event.preventDefault();
						deleteNotify();
						notifyEmptyPassword = createNotify(notifyBox, 'notify--error', notifications.emptyPassword, 'no-paddings');
						insertNotify('before', notifyEmptyPassword, selectInputMail);
					}

				} else {
					event.preventDefault();
					deleteNotify();
					notifyIncorrectEmail = createNotify(notifyBox, 'notify--error', notifications.wrongFormatEmail, 'no-paddings');
					insertNotify('before', notifyIncorrectEmail, selectInputMail);
				}

			} else {
				event.preventDefault();
				deleteNotify();
				notifyEmptyMail = createNotify(notifyBox, 'notify--error', notifications.emptyEmail, 'no-paddings');
				insertNotify('before', notifyEmptyMail, selectInputMail);
			}
		}
		
		return {
			init
		}
	}());

	checkRegistrationForm.init();

});