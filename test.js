const e = require("express");
const a = e();

a.listen(8080, "0.0.0.0", () => {
    console.log("Online");
});

a.get("/", (req, res) => {
    res.send("Test");
});
