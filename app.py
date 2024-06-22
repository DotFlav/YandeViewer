from flask import Flask, render_template, request, jsonify, send_file
import requests
from io import BytesIO

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search')
def search():
    tags = request.args.get('tags')
    url = "https://yande.re/post.json"
    params = {
        'tags': tags,
        'limit': 100
    }
    response = requests.get(url, params=params)
    posts = response.json()
    image_urls = [post['file_url'] for post in posts]
    return render_template('gallery.html', image_urls=image_urls, tags=tags)

@app.route('/image_proxy')
def image_proxy():
    img_url = request.args.get('url')
    response = requests.get(img_url)
    if response.status_code == 200:
        return send_file(BytesIO(response.content), mimetype='image/jpeg')
    else:
        return "Image not found", 404

if __name__ == '__main__':
    app.run(debug=False)


