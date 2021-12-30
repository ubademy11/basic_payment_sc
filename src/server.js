const config = require("./config");
const services = require("./services/services")({ config });
const routes = require("./routes");
const { connectToDB } = require("./lib/db");

// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });

fastify.register((fastify, options, done) => {
  fastify.register(require('fastify-cors'), { 
    origin: '*'
  });

  routes.forEach(route => fastify.route(route({ config, services })));
  done();
});

// Declares routes


// Run the server!
const start = async () => {
  try {
    await connectToDB();
    console.log('Connected to DATABASE');
    await fastify.listen(3003);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
