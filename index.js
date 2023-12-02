const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();

//setuing up routes here only

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/users", (req, res) => {
  const html = `
  <ul>
   ${users.map((user) => `<li>${user.first_name}</li>`).join(" ")}
  </ul>
  `;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    //todo
    return res.json({
      status: "pending",
    });
  })
  .delete((req, res) => {
    //todo
    return res.json({ status: "pending" });
  });

app.post("/api/users", (req, res) => {
  //todo
  return res.json({ status: "pending" });
});

app.listen(8002, () => {
  console.log("server is running on port 8002");
});
