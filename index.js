const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const { response } = require('express')
const express = require('express')

const app = express()

const url = 'https://books.toscrape.com/catalogue/category/books/childrens_11/index.html'
axios(url)
    .then (response=>{
            const html = response.data
            const $ = cheerio.load(html)

            const articles = [] //empty array

            $('.product_pod', html).each(function(){
                const title = $(this).find('h3').text()
                const url = $(this).find('h3').find('a').attr('href')
                articles.push({
                    title,
                    url
                })
            })
            console.log(articles)
        }).catch(err => console.log(err))

app.listen(PORT, ()=> console.log(`server running on PORT ${PORT}`))

