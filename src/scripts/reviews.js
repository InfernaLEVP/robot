export default function Reviews() {

    const xlBackground = document.getElementById('reviews__bg');
    const reviewsSlider = document.querySelector('.reviews__slider');

    setTimeout(() => {
        setReviewsSize();    
    }, 600);
    
    window.addEventListener('resize', () => {
        setReviewsSize();
    });
    
    function setReviewsSize() {
        if(window.innerWidth > 992){
            reviewsSlider.style.height = xlBackground.offsetHeight - 150 + 'px';
        }else{
            reviewsSlider.style.height = 'initial';
        }
    }

}