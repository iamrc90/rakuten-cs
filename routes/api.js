var express = require('express');
var router = express.Router();
var bookService = require("../services/bookService");
/* GET users listing. */
router.get('/book_list/:page', async (req, res, next) => {
    let pageNo = Number(req.params.page);

    // check if page is a valid numeric value
    if(! Number.isInteger(pageNo)){
      return res.status(400).send({
        'error' : true,
        'message' : "page path param is not correct",
        "code": 400
      });
    }
    // call the book service 
    try{
        let books = await bookService.getBooks(pageNo);
        if (!books || books.length == 0){
          return res.status(404).send({
            error : true,
            message : "page not found"
          });
        }
        return res.status(200).send(books);
    }catch(e){
      console.log(e);
        return res.status(500).send({
          error : true,
          message : "server error"
        });
    }
});

module.exports = router;
