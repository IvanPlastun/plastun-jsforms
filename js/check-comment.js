$(document).ready(function() {

	let checkFormComments = (function() {
		//Инициализация модуля
		let init = function() {
			_setUpListeners();
		}

		let _setUpListeners = function() {
			$('#comment-form').on('submit', _validateForm);
		}

		let _validateForm = function(event) {
			let form = $(this), 
				textarea = form.find('textarea'),
				required = textarea.data('required'),
				notifybox = $('<div class="notify notify--error">Комментарий не может быть пустым</div>'),
				commentText = textarea.val().trim();
			
			$.each(textarea, function(index, elem) {
				if(textarea.data('required') == 'required') {
					if(commentText.length !== 0) {
						form.find('.notify').remove();
						form.submit();
					} else {
						event.preventDefault();
						form.find('.notify').remove();
						notifybox.insertBefore(textarea);
					}
				}
			});
		}

		return {
			init
		}
	}());

	checkFormComments.init();

});