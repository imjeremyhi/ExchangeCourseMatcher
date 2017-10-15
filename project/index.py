from flask import Blueprint, render_template, request, json, redirect, url_for
from db import get_courses, get_countries, get_universities, get_matches, get_similarity, get_course_keywords_by_id

import compare

index_page = Blueprint('index_page', __name__, template_folder='templates')

@index_page.route('/', methods=['GET', 'POST'])
def index():
    results = []
    courses_from_db = get_courses()
    countries_from_db = get_countries()
    universities_from_db = get_universities()

    courses = courses_from_db_to_json(courses_from_db)
    countries = countries_from_db_to_json(countries_from_db)
    universities = universities_from_db_to_json(universities_from_db)

    return render_template('index.html', courses=json.dumps(courses), countries=json.dumps(countries), universities=json.dumps(universities), results=json.dumps(results))

@index_page.route('/ajax/<courses>/<universities>/<countries>', methods=['GET'])
def handle_ajax_request(courses = None, universities = None, countries = None):
    #return courses + universities + countries
    courses_query_list = json.loads(courses)
    universities_query_list = json.loads(universities)
    countries_query_list = json.loads(countries)

    if len(courses_query_list) > 0:
        course_list = json.loads(courses)
        results = get_matches(courses_query_list, universities_query_list, countries_query_list)
        for unsw_course in course_list:
            # print unsw_course
            unsw_keywords = get_course_keywords_by_id(unsw_course)[0]

            # acct1501
            for university_dict in results:
            # gatech
                for target_course in university_dict["courses"]:

                    # print target_course

                    #compare unsw_course vs target_course
                    similarity = get_similarity(unsw_course, target_course["id"])

                    if similarity == None:
                        # print "No existing sim found for %d vs %d. Processing..." % (int(unsw_course), int(target_course["id"]))
                        # do sim
                        # print get_course_keywords_by_id(unsw_course)
                        sim = compare.compare_keywords(get_course_keywords_by_id(unsw_course)[0],[target_course["keywords"]])
                        # print sim



        #

        # for course in results

        # results = [
        #     {
        #         "university": "Georgia Tech",
        #         "courses": [
        #             {
        #                 "name": "ACCT1821 - Something",
        #                 "similarity_score": "45%"
        #             },
        #             {
        #                 "name": "TEST1231 - Something different",
        #                 "similarity_score": "37%"
        #             }
        #         ]
        #     }
        # ]
        return json.dumps(results)
    else:
        return json.dumps([])

def courses_from_db_to_json(courses_from_db):
    courses = []
    for record in courses_from_db:
        course = {}
        course_code = record[0]
        course_title = record[1]
        course_id = record[2]
        course["name"] = course_code + " - " + course_title
        course["id"] = course_id
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
        university["country"] = record[1]
        universities.append(university)
    return universities
