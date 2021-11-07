// two separate things that matter needs
// first: an engine - computation and maths
// second: a renderer - this draws the engine

// alias to make the code clearer
// const Engine = Matter.Engine;
// const Render = Matter.Render;
// The below is deconstructed of the above for simplification
const {Engine, Render, Bodies, World, MouseConstraint, Composites} = Matter 

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
    return Bodies.rectangle(x, y, 38, 50, {
        // add friction to the elements to make them float
        frictionAir: 0.05,
        // edit the colour of the shape 
        render: {
            sprite: {
                texture: "outline-2x.png",
                xScale: 0.5,
                yScale: 0.5
            }
        }
    });
}

const bigBall = Bodies.circle(w / 2, h / 2, Math.min(w/4, h/4), {
    isStatic: true,
    render: {
        fillStyle: "#fff"
    }
});

const wallOptions = {
    isStatic: true,
    render: {
        visible: false
    }
};

const ground = Bodies.rectangle(w / 2, h + 50, w + 100, 100, wallOptions);
const ceiling = Bodies.rectangle(w / 2, -50, w + 100, 100, wallOptions);
const leftWall = Bodies.rectangle(-50, h / 2, 100, h + 100, wallOptions);
const rightWall = Bodies.rectangle(w + 50, h / 2, 100, h + 100, wallOptions);

const mouseControl = MouseConstraint.create(engine, {
    element: sectionTag,
    constraint: {
        render: {
            visible: false
        }
    }
})

const initialShapes = Composites.stack(50, 50, 15, 5, 40, 40, function (x, y) {
    return createShape(x, y)
})

// actually add these to the page
World.add(engine.world, [
    bigBall,
    ground,
    ceiling,
    leftWall,
    rightWall,
    mouseControl,
    initialShapes
])


// when we click the page, add a new shape
document.addEventListener("click", function (event) {
    const shape = createShape(event.pageX, event.pageY);
    World.add(engine.world, shape);
}) 




// run the engine and the renderer
Engine.run(engine);
Render.run(renderer);



// Adding gravity to the site using cosine wave
let time = 0;
const chnageGravity = function () {
    time = time + 0.01;
    engine.world.gravity.y = Math.cos(time)
    requestAnimationFrame(chnageGravity)
};
chnageGravity(); 


/* this is for older apple devices as functionality has been removed 2019 
window.addEventListener("deviceorientation", function (event) {
    engine.world.gravity.x = event.gamma / 30
    engine.world.gravity.y = event.beta / 30
}) */