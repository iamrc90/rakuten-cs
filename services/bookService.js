const cheerio = require('cheerio');
const axios = require('axios');
let  goodBooksURL = "https://www.goodreads.com/list/show/1.Best_Books_Ever";
// let getBooks = async (pageNo) => {

//     let response = await request.get(`${goodBooksURL}?page=${pageNo}`);

//     console.log(response.body);
// }

let getBooks = async (pageNo) => {
    let url = `${goodBooksURL}?page=${pageNo}`;
    const result = await axios.get(url);
    let books = [];
    if(result.status == 200){
        let $ = cheerio.load(result.data);

        $('#all_votes table tr').each(function (i, e) {
            let tdEL = $(this).children().eq(2);
            let title = tdEL.children('.bookTitle').first().text().trim();
            let author = tdEL.find('a.authorName').text().trim();
            let votesAndScoreStr = tdEL.find('div span.smallText').text().trim();
            let strArr = votesAndScoreStr.split('\n');
            let votes = parseInt(strArr[strArr.length -1].trim().split(" ")[0]);

            books[i] = {
                "title" : title,
                "author" : author,
                "votes" : votes
            }
            
        });
        return books;   
    }
    return null;
}
module.exports = {
    getBooks
}