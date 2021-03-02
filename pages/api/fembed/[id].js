const request = require("request");
const axios = require("axios");

export default async (req, res) => {
    const response = await axios.post(`https://femax20.com/api/source/${req.query.id}`);
    res.setHeader("content-disposition", "attachment; filename=video.mp4");
    res.setHeader("content-type", "video/mp4");
    request.get(response.data.data[0].file).on("error", function(err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write("<h1>404 not found</h1>");
        res.end();
        return;
    }).pipe(res);
};