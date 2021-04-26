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

            console.log(e.target);
        });
    });
}