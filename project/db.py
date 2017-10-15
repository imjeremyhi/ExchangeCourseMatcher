from flask.ext.mysql import MySQL
import re

conn = None

def set_connection(app):
    mysql = MySQL()
    # MySQL configurations
    with open("project/credentials.txt", "r") as credentials_file:
        credentials = credentials_file.read().splitlines()

        app.config['MYSQL_DATABASE_USER'] = credentials[0]
        app.config['MYSQL_DATABASE_PASSWORD'] = credentials[1]
        app.config['MYSQL_DATABASE_DB'] = credentials[2]
        app.config['MYSQL_DATABASE_HOST'] = credentials[3]

        mysql.init_app(app)
        global conn
        conn = mysql.connect()

def execute_query(query):
    cursor = conn.cursor()
    cursor.execute(query)
    results = cursor.fetchall()
    cursor.close()
    return results

def get_courses():
    query = "SELECT course_code, course_title, id from course_scrape where university = 'University of New South Wales'"
    results = execute_query(query)

    returned_results = []
    results_without_duplicates = []
    course_title_pattern = re.compile("[^,]+")
    for result in results:
        course_title = re.search(course_title_pattern, result[1]).group(0)
        if course_title not in results_without_duplicates:
            returned_results.append((result[0], course_title, result[2]))
            results_without_duplicates.append(course_title)

    return returned_results

def get_countries():
    query = "SELECT distinct country from university"
    results = execute_query(query)
    return results

def get_universities():
    query = "SELECT distinct university from course_scrape where university <> 'University of New South Wales'"
    results = execute_query(query)
    return results

def get_matches(courses, universities, countries):
    # similarity table = similarity_score, components_of_score, unsw_course, partner_course, partner_uni
    # precondition at least one course passed
    query = "SELECT similarity_score from similarity where unsw_course = '%s'" % courses[0]

    for course in courses:
        query += " or unsw_course = '%s'" % course

    for university in universities:
        query += " or university = '%s'" % university

    for country in countries:
        query += " or country = '%s'" % country

    results = []#execute_query(query)
    # todo add to query the or conditions from input
    # eg for all courses add or blah etc to the query and execute that
    return results

#conn = get_connection(app)
