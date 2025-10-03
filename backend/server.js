const dotenv = require("dotenv");

const { sequelize } = require("./models/index");

dotenv.config();

const app = require("./app");

const port = process.env.APP_PORT || 3000;

const bootstrap = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // temporary solution for test project
    console.log("DB connected...");
    app.listen(port, () => console.log(`Server is listening on ${port}...`));
  } catch (err) {
    console.error("Server start error:", err);
  }
};

bootstrap();
