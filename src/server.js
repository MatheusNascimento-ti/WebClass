const express = require("express")
const server = express()
const nunjucks = require("nunjucks")
const {
    landing,
    study,
    teach
} = require("./pages.js")

nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

server
.use(express.static("public"))
.get("/", landing)
.get("/study", study)
.get("/teach", teach)
.listen(5500)