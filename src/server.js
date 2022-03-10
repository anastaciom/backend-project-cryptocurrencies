const app = require("./app");
const mongoDBConnect = require("./config/database");
mongoDBConnect();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
