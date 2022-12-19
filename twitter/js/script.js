'use strict';

const _graphic = (function () {
    let state = 0;          // state - 0: loading, 1: ready to be played, 2: has been played and can be stopped 
    let activeStep = 0;     // activeStep - the title currently being show
    let currentStep = 0;    // currentStep - track which title is going to be shown after all the animations play out
    let data = [];          // data - array of titles and subtitles
    // let style = {
    //     primaryColor: "lightblue",
    //     textColor: "black",
    //     position: "center"
    // };              // style - contains the primary color and text color data

    (function () {
        // Runs after the rest of the parent function parses
        window['update'] = (raw) => update(raw);
        window['play'] = play;
        window['next'] = next;
        window['stop'] = stop;
        window['remove'] = remove;
    })();

    function applyData() {
        const twitter = document.querySelector('.twitter');


        twitter.textContent = data[activeStep].twitter;
    }

    // function applyStyle() {
    //     const container = document.querySelector('.lt-style-one');
    //     const graphic = container.querySelector('.graphic');
    //     const [pathLeft, pathRight] = graphic.querySelectorAll('svg path');
    //     const title = graphic.querySelector('h1');
    //     const subtitle = graphic.querySelector('.subtitle');

    //     // Set the elements CSS styles
    //     pathLeft.style.stroke = style.primaryColor;
    //     pathRight.style.stroke = style.primaryColor;
    //     title.style.color = style.textColor;
    //     subtitle.style.color = style.textColor;
    //     subtitle.style.backgroundColor = style.primaryColor;

    //     // Position the graphic on screen
    //     switch (style.position) {
    //         case 'left':
    //             container.style.marginRight = 'auto';
    //             break;
    //         case 'center':
    //             container.style.margin = '4vh auto';
    //             break;
    //         default:
    //             container.style.marginLeft = 'auto';
    //             break;
    //     }
    // }

    // function getComputedStyle(elem, styles) {
    //     // Get the element's computed styles
    //     const computedStyles = window.getComputedStyle(elem);
    //     // Create an array to hold the requested results
    //     const values = [];
    //     if (Array.isArray(styles)) {
    //         // Loop over each style requested and all the value to the result
    //         styles.forEach(s =>
    //             values.push(computedStyles.getPropertyValue(s)));
    //     } else {
    //         values.push(computedStyles.getPropertyValue(styles));
    //     }
    //     return values.map(v => {
    //         // Clean up pixel values
    //         if (v.includes('px')) v = Number(v.substring(0, v.length - 2));
    //         return v;
    //     });
    // }

    function update(raw) {
        let parsed;
        // Try and parse incoming string as JSON
        try {
            parsed = JSON.parse(raw);
            if (!Object.keys(parsed).length)
                throw new Error('Empty objects are invalid');
            if (!parsed.style) {
                if (!parsed.data)
                    throw new Error('Invalid data object');
            }
        } catch (e) { // Parse Failed
            handleError(e);
            return;
        }
        Array.isArray(parsed.data) // Save the text data
            ? data = data.concat(parsed.data)
            : data.push(parsed.data);
        // style = parsed.style; // Save the style data

        if (state === 0) {
            try {
                applyData();
                // applyStyle();
                state = 1; // Graphic has been loaded
            } catch (error) {
                handleError(error);
                return;
            }
        }
    }

    function animateIn() {
        const tl = new gsap.timeline({ duration: 0, ease: 'power1.out' });
        tl.set(".element", { x: "-100%" }).set(".element", { opacity: 1 }).to(".element", { x: 0 })
    }

    function play() {
        if (state === 1) {
            animateIn();
            state = 2;
        }
    }

    function next() { }

    function animateOut() {
        /* The same vas the animateIn function */
        const tl = new gsap.timeline({ duration: 0, ease: 'power1.out' });
        tl.set(".element", { x: 0 }).to(".element", { x: "-120%" })
    }

    function stop() {// State 2 means graphic is played and ready to be stopped
        if (state === 2) {
            animateOut();
            state = 1;
        }
    }
    function remove() { }


    function handleError(e) { console.error(e) }
    function handleWarning(w) { console.log(w) }

    return {}

})();
