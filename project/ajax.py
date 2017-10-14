from flask import Blueprint, render_template, request, json
from db import get_courses, get_countries, get_universities

index_page = Blueprint('index_page', __name__, template_folder='templates')
from app import app

@app.route('/ajax/<courses>/<universities>/<countries>', methods=['GET'])
def ajax(courses = None, universities = None, countries = None):
    a
    if courses is not None:
        a
        results = [{"university": "Georgia Tech", "courses": [{"name": "ACCT1821 - Something", "similarity_score": "45%"}, {"name": "TEST1231 - Something different", "similarity_score": "37%"}]}]
        return results

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