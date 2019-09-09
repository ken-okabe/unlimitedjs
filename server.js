const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");

const mimeTypes = {
  "html": "text/html",
  "js": "text/javascript",
  "css": "text/css",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "png": "image/png",
  "gif": "image/gif",
  "svg": "image/svg"
  // more
};

const request = directory => (req, res) => {
  const uri = url.parse(req.url).pathname;
  const dir = path.join(__dirname, directory);
  const filepath = path.join(dir, unescape(uri));
  const indexfilepath = path.join(dir, unescape("index.html"));

  console.info("filepath", filepath);

  const f = (err, stats) => {
    (err)
      ? (() => {
        console.log("server error");
      })()
      : (stats === undefined) // path does not exit 404
        ? (() => {
          res.writeHead(404,
            {
              "Content-Type": "text/plain"
            });
          res.write("404 Not Found\n");
          res.end();

          return;
        })()
        : (stats.isFile()) // path exists, is a file
          ? (() => {
            const mimeType = mimeTypes[path.extname(filepath).split(".")[1]];
            res
              .writeHead(200,
                {
                  "Content-Type": mimeType
                });

            const fileStream = fs
              .createReadStream(filepath)
              .pipe(res);

            return;
          })()
          : (stats.isDirectory()) // path exists, is a directory
            ? (() => {
              res
                .writeHead(200,
                  {
                    "Content-Type": "text/html"
                  });

              const fileStream2 = fs
                .createReadStream(indexfilepath)
                .pipe(res);

              return;
            })()
            : (() => {
              // Symbolic link, other?
              // TODO: follow symlinks?  security?
              res
                .writeHead(500,
                  {
                    "Content-Type": "text/plain"
                  })
                .write("500 Internal server error\n")
                .end();

              return;
            })()
  };
  const component = fs.stat(filepath, f);
  return;
};


const server = directory => port => serverUp => http
  .createServer(request(directory))
  .listen(port, serverUp);

export { server };