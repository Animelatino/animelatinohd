const request = require("request");
const axios = require("axios");

export default async (req, res) => {
    var range = 'undefined' !== typeof req.headers.range ? req.headers.range : 'bytes=0-';
    var positions, start, end, total, chunksize;
    const dataVideo = await axios.post(`https://femax20.com/api/source/${req.query.id}`);
    res.status(206);
    res.setHeader("accept-ranges", "bytes");
    res.setHeader("content-disposition", "attachment; filename=video.mp4");
    res.setHeader("content-type", "video/mp4");
    request({
        url: dataVideo.data.data[0].file,
        method: 'HEAD'
    }, function (error, response, body) {
        if (!error) {
            positions = range.replace(/bytes=/, "").split("-");
            start = parseInt(positions[0], 10);
            total = response.headers['content-length'];
            end = positions[1] ? parseInt(positions[1], 10) : total - 1;
            chunksize = (end - start) + 1;
            res.setHeader("content-range", "bytes " + start + "-" + end + "/" + total);
            res.setHeader("content-length", chunksize);
            request.get(dataVideo.data.data[0].file).on("error", function(err) {
                res.status(200).json({
                    msg: err
                })
                res.end();
                return;
            }).pipe(res);
        }
    });
};