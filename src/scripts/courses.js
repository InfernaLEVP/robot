export default function Courses() {
    const aboutButtons = document.querySelectorAll('.course__details');
    const closeButtons = document.querySelectorAll('.close-pitch');
    const orderButtons = document.querySelectorAll('.course__order');

    orderButtons.forEach(el => {
        el.addEventListener('click', (e) => {
            
            const parentLevel2 = e.target.parentNode.parentNode;

            if(parentLevel2.classList.contains('course')){
                document.getElementById('m-course').value = parentLevel2.querySelector('.course__name').innerText;
                return true;
            }

            const parentLevel3 = e.target.parentNode.parentNode.parentNode;
            
            if(parentLevel3.classList.contains('course')){
                document.getElementById('m-course').value = parentLevel3.querySelector('.course__name').innerText;
            }

        });
    });

    aboutButtons.forEach( el => {
        el.addEventListener('click', (e) => {
            const card = e.target.parentNode.parentNode;
            const pitch = card.querySelector('.course__pitch');
            const cardActions = e.target.parentNode;

            card.style.setProperty('--height', calculateHeight(pitch) + "px");

            cardActions.style.display = 'none';
            pitch.classList.add('opened');
            setTimeout(() => {
                coursesCollapse();    
            }, 300);
            
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
    const initialCourses = document.querySelector('.initial__courses');
    const coursesList = document.querySelector('.corses__list');
    const courseCollapser = document.querySelector('.courses__collapser');
    const courses = coursesList.querySelectorAll('.course');

    coursesCollapse();
    
    window.addEventListener('resize', () => {
        coursesCollapse();
    });

    function coursesCollapse(){
        if(window.innerWidth > 992){
            // let initHeight = 0;

            if(courses){
                // initHeight += courses[1].offsetHeight + courses[4].offsetHeight + 56;
                courseCollapser.style.height = initialCourses.offsetHeight + 'px';
                
            }

            allButton.addEventListener('click', (e) => {

                const state = e.target.dataset.state;

                if(state === 'closed'){
                    // let currentHeight = 30;
                    // const count = courses.length / 3;

                    // for (let i = 0; i < count; i++) {
                    //     const element = courses[i + 3];
                    //     currentHeight += element.offsetHeight + 28;
                    //     console.log(currentHeight);
                    // }

                    courseCollapser.style.height = coursesList.offsetHeight + 'px';
                    e.target.dataset.state = 'opened';
                }else{
                    // let initHeight = 0;
                    if(courses){
                        // initHeight += courses[1].offsetHeight + courses[4].offsetHeight + 56;
                        courseCollapser.style.height = initialCourses.offsetHeight + 'px';
                        e.target.dataset.state = 'closed';
                    }
                }
                
            });
        }else{
            courseCollapser.style.height = 'initial';
        }
    }
    

}