export default function Courses() {
    const aboutButtons = document.querySelectorAll('.course__details');
    const closeButtons = document.querySelectorAll('.close-pitch');

    aboutButtons.forEach( el => {
        el.addEventListener('click', (e) => {
            const card = e.target.parentNode.parentNode;
            const pitch = card.querySelector('.course__pitch');
            const cardActions = e.target.parentNode;

            card.style.setProperty('--height', calculateHeight(pitch) + "px");

            cardActions.style.display = 'none';
            pitch.classList.add('opened');
        });
    });

    closeButtons.forEach( el => {
        el.addEventListener('click', (e) => {
            const card = e.target.parentNode.parentNode.parentNode;
            const pitch = card.querySelector('.course__pitch');
            const cardActions = card.querySelector('.course__actions');

            card.style.setProperty('--height', "0px");

            cardActions.style.display = 'flex';
            pitch.classList.remove('opened');
        });
    });

    function calculateHeight(el){
        const text = el.querySelector('p');
        const button = el.querySelector('.course__order');

        return text.clientHeight + button.clientHeight + 25;
    }

    // show all Courses
    const allButton = document.getElementById('allCourses');
    const coursesList = document.querySelector('.corses__list');
    const courses = coursesList.querySelectorAll('.course');

    coursesCollapse();
    
    window.addEventListener('resize', () => {
        coursesCollapse();
    });

    function coursesCollapse(){
        if(window.innerWidth > 992){
            let initHeight = 0;
            if(courses){
                initHeight += courses[1].offsetHeight + courses[4].offsetHeight + 56;
                coursesList.style.height = initHeight + 'px';
            }
            

            allButton.addEventListener('click', (e) => {

                const state = e.target.dataset.state;

                if(state === 'closed'){
                    let currentHeight = 30;
                    const count = courses.length / 3;

                    for (let i = 0; i < count; i++) {
                        const element = courses[i + 3];
                        currentHeight += element.offsetHeight + 28;
                        console.log(currentHeight);
                    }

                    coursesList.style.height = currentHeight + 'px';
                    e.target.dataset.state = 'opened';
                }else{
                    let initHeight = 0;
                    if(courses){
                        initHeight += courses[1].offsetHeight + courses[4].offsetHeight + 56;
                        coursesList.style.height = initHeight + 'px';
                        e.target.dataset.state = 'closed';
                    }
                }
                
            });
        }else{
            coursesList.style.height = 'initial';
        }
    }
    

}