const userControler = require("../Controller/book");
const router = require("express").Router();
router.post("/add-book", userControler.addBook);
router.post("/serach-by-name", userControler.searchByname);
router.post("/search-by-author", userControler.serachByauthor);
router.post("/remove-book", userControler.removeBook);
module.exports = router;
