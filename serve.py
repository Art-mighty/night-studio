# A local web server for trying Night Studio on this computer: `python3 serve.py`, then open http://localhost:8000.
# Same as `python3 -m http.server 8000`, except it tells the browser never to keep old copies of the files, so an edit
# (say, to js/content/days.js) always shows up on the next reload.
import http.server


class FreshFiles(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    http.server.test(HandlerClass=FreshFiles, port=8000, bind="127.0.0.1")
