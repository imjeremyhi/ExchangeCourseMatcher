from flask import Flask, render_template, request, json
from db import setup_db, query_db

app = Flask(__name__)

cursor = setup_db(app)
db_result = query_db(cursor)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == "POST":
        user_request = {"universities": []}
        for key, value in request.form.items():
            if key == "facultyFilter" or key == "courseFilter":
                user_request[key] = value
            else:
                user_request["universities"].append(value)
        #print(user_request["facultyFilter"])
        #print(user_request["courseFilter"])
        #print(user_request["universities"])
    # universities = json.dumps([
    #     {"name": "UNIVERSITY OF NEW YORK", "country": "USA", "isSelected": True},
    #     {"name": "UNIVERSITY OF HONG KONG", "country": "HONG KONG", "isSelected": False}
    # ])
    #uni_query = json.dumps(db_result[0])
    #print(uni_query)
    universities = []
    for entry in db_result[0]:
        university = {}
        university["name"] = entry[0]
        university["country"] = "USA" #entry[1]
        university["isSelected"] = False
        universities.append(university)

    courses = []
    for entry in db_result[1]:
        course = {}
        course["name"] = entry[0]
        course["faculty"] = "Business School"
        course["text"] = entry[1]
        courses.append(course)
    # courses = json.dumps([
    #     {"name": "ECON1203", "faculty": "Business School"}, {"name": "COMP1000", "faculty": "Engineering"}, 
    #     {"name": "INFS1603", "faculty": "Business School"}, {"name": "INFS1602", "faculty": "Business School"}
    # ])
    return render_template('index.html', universities=json.dumps(universities), courses=json.dumps(courses))


@app.route('/hello')
def hello():
    return render_template('hello.html')


if __name__ == '__main__':
    app.run(debug=True)
