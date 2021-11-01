// two separate things that matter needs
// first: an engine - computation and maths
// second: a renderer - this draws the engine

// alias to make the code clearer
// const Engine = Matter.Engine;
// const Render = Matter.Render;
// The below is deconstructed of the above for simplification
const {Engine, Render, Bodies, World} = Matter 

// where is matter being deployed?
const sectionTag = document.querySelector("section.shapes");

// what is the width and height of the page
const w = window.innerWidth;
const h = window.innerHeight;

const engine = Matter.Engine.create();
const renderer = Matter.Render.create({
    element: sectionTag,
    engine: engine,
    options: {
        height: h,
        width: w,
        background: "#000",
        // default matter sets wireframe to true, which is not #000 so we need to make false
        wireframes: false,
        pixelRatio: window.devicePixelRatio
    }
});

// have the ability to create a brand new shape
const createShape = function (x, y) {
    return Bodies.circle(x, y, 20 + 20 * Math.random());
}



// when we click the page, add a new shape
document.addEventListener("click", function (event) {
    const shape = createShape(event.pageX, event.pageY);
    World.add(engine.world, shape);
})












// run the engine and the renderer
Engine.run(engine);
Render.run(renderer);

