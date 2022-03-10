const app = require("./src/app");
const mongoDBConnect = require("./src/database/config");
mongoDBConnect();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
