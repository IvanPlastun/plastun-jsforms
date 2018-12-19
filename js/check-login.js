$(document).ready(function() {

	let checkLoginForm = (function() {

		let data = {
			email: 'mail@mail.com',
			password: 123
		}
		//Инициализация модуля
		let init = function() {
			_setUpListeners();
		}

		let _setUpListeners = function() {
			$('#login-form').on('submit', _validateForm);
		}

		let _validateForm = function(event) {
			// Объект для хранения текста нотификаций
			let notifications = {
				emptyemail: 'Введите email',
				emptyPassword: 'Введите пароль',
				wrongFormatEmail: 'Неверный формат email',
				wrongEmailOrPassword: 'Неверный email или пароль',
				notifyDescription: $('<div class="notify no-radius-bottom notify--error">Неверный email или пароль</div> <div class="notify no-radius-top"><p>Введите верные данные для входа или воспользуйтесь <a href="#!">восстановлением пароля </a>, чтобы войти на сайт.</p></div>')
			}

			let form = $(this),
				inputs = $('input'),
				selectInputMail = $('#emailfield'),
				selectInputPassword = $('#passwordfield'),
				email = inputs[0].value.trim(),
				password = inputs[1].value.trim(),
				notifyBox = $('<div class="notify no-paddings"></div>'),
				pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z{2,4}\.])?[a-z]{2,4}$/i;

			
			//Переменные для нотификаций
			let emptyMail,
				emptyPassword,
				incorrectFormatMail,
				wrongPasswordOrMail;
			
			let createNotify = function(box, objectNotify, classes, removeClasses) {
				let blocknotify;
				if(removeClasses != undefined)
					blocknotify = box.removeClass(removeClasses).addClass(classes).text(objectNotify);
				else
					blocknotify = box.addClass(classes).text(objectNotify);
				return blocknotify;
			}

			let deleteNotify = function() {
				form.find('.notify').remove();
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

			if(email.length != 0) {
				if(pattern.test(email)) {
					deleteNotify();

					if(password.length != 0) {
						deleteNotify();

						if(email == data.email && password == data.password) {
							deleteNotify();
							form.submit();
						} else {
							event.preventDefault();
							deleteNotify();
							wrongPasswordOrMail = notifyBox.html(notifications.notifyDescription);
							insertNotify('before', wrongPasswordOrMail, selectInputMail);
						}

					} else {
						event.preventDefault();
						deleteNotify();
						emptyPassword = createNotify(notifyBox, notifications.emptyPassword, 'notify--error', 'no-paddings');
						insertNotify('before', emptyPassword, selectInputMail);
					}

				} else {
					event.preventDefault();
					deleteNotify();
					incorrectFormatMail = createNotify(notifyBox, notifications.wrongFormatEmail, 'notify--error', 'no-paddings');
					insertNotify('before', incorrectFormatMail, selectInputMail);
				}
			} else {
				event.preventDefault();
				deleteNotify();
				emptyMail = createNotify(notifyBox, notifications.emptyemail, 'notify--error', 'no-paddings');
				insertNotify('before', emptyMail, selectInputMail);
			} 			
		}

		return {
			init
		}
	}());

	checkLoginForm.init();
});