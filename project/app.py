from flask import Flask
from index import index_page
from db import set_connection

app = Flask(__name__)
app.register_blueprint(index_page)
set_connection(app)

if __name__ == '__main__':
    app.run(debug=True)
