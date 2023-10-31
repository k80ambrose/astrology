const express = require('express')
const app = express()
const axios = require('axios');
const cheerio = require('cheerio');
const port = 80

app.use(express.static('www'))

app.get('/scrape', async (req, res) => {
    try {
      // Make HTTP request to the target webpage
      const { data } = await axios.get('https://www.astro.com/pl_e.htm');
  
      // Initialize cheerio
      const $ = cheerio.load(data);
      const info = []
      const rows = $('#pla tbody').children()
      rows.each((i, tr) => {
        if (i > 0 && i < 13) {
            const cols = $(tr).children()
            info.push({
               planet:  cols.eq(1).text(),
               degree: cols.eq(2).text(),
               sign: cols.eq(3).children().eq(0).attr('title'),
            })
        }
      });

      // Send the scraped data
      res.json(info);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred');
    }
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})