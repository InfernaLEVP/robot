export default function Forms() {
    const forms = document.querySelectorAll('.form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const messageWrapepr = e.target.querySelector('.form__result');
            const messageTextContent = e.target.querySelector('.form__message');

            const message = 'Форма отправлена!';

            messageTextContent.innerText = message;

            messageWrapepr.classList.add('visible');

            setTimeout(() => {
                messageWrapepr.classList.remove('visible');
            }, 3000);

            const formData = new FormData(e.target);
            const xhr = new XMLHttpRequest();
            xhr.open("POST", e.target.action, true);
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.onload = function(e) {
        
              // Response
              try {
                var response = JSON.parse(xhr.response);
              } catch(e) {
                var response = { success: false, error_msg: 'no json request' }
              }
        
              // Success
              if(xhr.status === 200 && response.success == true) {
        
                // Redirect to Success-URL
                // ... or display Success-Message
                console.log("Success!");
              }
        
              // Error
              else {
        
                // Display Error Message
                var msg = response.error;
                if(response.error_msg != '')
                  msg = response.error_msg;
                console.log("Error: " + msg);
              }
            };
        
            xhr.send(formData);

        });
    });
      
}