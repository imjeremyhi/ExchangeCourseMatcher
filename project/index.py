from flask import Blueprint, render_template, request, json
from db import get_courses, get_countries, get_universities

index_page = Blueprint('index_page', __name__, template_folder='templates')

@index_page.route('/', methods=['GET', 'POST'])
def index():
    if request.method == "POST":
        user_request = {
            "courses": [],
            "countries": [],
            "universities": []
        }
        for key, value in request.form.items():
            if key == "courseFilter":
                user_request["courses"].append(value)
            elif key == "countryFilter":
                user_request["countries"].append(value)
            elif key == "universityFilter":
                user_request["universities"].append(value)
            else:
                print("Error")
        #print(user_request["facultyFilter"])
        #print(user_request["courseFilter"])
        #print(user_request["universities"])
    # universities = json.dumps([
    #     {"name": "UNIVERSITY OF NEW YORK", "country": "USA", "isSelected": True},
    #     {"name": "UNIVERSITY OF HONG KONG", "country": "HONG KONG", "isSelected": False}
    # ])
    #uni_query = json.dumps(db_result[0])
    #print(uni_query)
    courses_from_db = get_courses()
    countries_from_db = get_countries()
    universities_from_db = get_universities()

    courses = courses_from_db_to_json(courses_from_db)
    countries = countries_from_db_to_json(countries_from_db)
    universities = universities_from_db_to_json(universities_from_db)

    # courses = json.dumps([
    #     {"name": "ECON1203", "faculty": "Business School"}, {"name": "COMP1000", "faculty": "Engineering"}, 
    #     {"name": "INFS1603", "faculty": "Business School"}, {"name": "INFS1602", "faculty": "Business School"}
    # ])
    return render_template('index.html', courses=json.dumps(courses), countries=json.dumps(countries), universities=json.dumps(universities))

def courses_from_db_to_json(courses_from_db):
    courses = []
    for record in courses_from_db:
        course = {}
        course_code = record[0]
        course_title = record[1]
        course["name"] = course_code + " - " + course_title
        courses.append(course)
    return courses

def countries_from_db_to_json(countries_from_db):
    countries = []
    for record in countries_from_db:
        country = {}
        country["name"] = record[0]
        countries.append(country)
    return countries

def universities_from_db_to_json(universities_from_db):
    universities = []
    for record in universities_from_db:
        university = {}
        university["name"] = record[0]
        universities.append(university)
    return universities