from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == "POST":
        user_request = {"universities": []}
        for key, value in request.form.items():
            if key == "facultyFilter" or key == "courseFilter":
                user_request[key] = value
            else:
                user_request["universities"].push()
        print(user_request)
    return render_template('index.html')


@app.route('/hello')
def hello():
    return render_template('hello.html')


if __name__ == '__main__':
    app.run(debug=True)
