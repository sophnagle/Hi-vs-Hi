// two separate things that matter needs
// first: an engine - computation and maths
// second: a renderer - this draws the engine

// where is matter being deployed?
const sectionTag = document.querySelector("section.shapes");

const engine = Matter.Engine.create();
const renderer = Matter.Render.create({
    element: sectionTag,
    engine: engine
});

// run the engine and the renderer
Matter.Engine.run(engine);
Matter.Render.run(renderer);

