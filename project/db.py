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
    query = "SELECT distinct name, country from university where name <> 'University of New South Wales'"
    results = execute_query(query)
    return results

def get_matches(courses, universities, countries):
    # similarity table = similarity_score, components_of_score, unsw_course, partner_course, partner_uni
    # precondition at least one course passed

    target_course_list = get_target_courses(universities)
    # print target_course_list

    # query = "SELECT similarity_score from similarity where unsw_course = '%s'" % courses[0]
    #
    # for course in courses:
    #     query += " or unsw_course = '%s'" % course
    #
    # for university in universities:
    #     query += " or university = '%s'" % university
    #
    # for country in countries:
    #     query += " or country = '%s'" % country

    results = target_course_list#execute_query(query)
    # todo add to query the or conditions from input
    # eg for all courses add or blah etc to the query and execute that
    return results

def get_target_courses(universities):
    uni_mysql_list = ""
    for uni in universities:
        uni_mysql_list += "'"+uni+"', "


    query = "SELECT university, course_code, course_title, id, keywords FROM course_scrape WHERE university IN (%s);" % uni_mysql_list[:-2]
    # print query
    results = execute_query(query)

    uni_dict_list = []
    for uni in universities:
        uni_dict = {}
        uni_dict["university"] = uni
        uni_dict["courses"] = []
        uni_dict_list.append(uni_dict)

    for course in results:
        target_dict = None
        for uni_dict in uni_dict_list:
            if uni_dict["university"] == course[0]:
                target_dict = uni_dict
                break
        uni_dict["courses"].append( {
            "name": course[1] + " " + course[2],
            "id": course[3],
            "keywords": course[4],
            "similarity_score": "50%"
        })
    # print uni_dict_list
    return uni_dict_list

def get_similarity(course1, course2):
    query = "SELECT similarity FROM similarity WHERE course1 = %d and course2 = %d;" % (int(course1), int(course2))

    results = execute_query(query)
    # print results
    if len(results) == 0:
        # do the sim
        return None
    else:
        return results[0][2]

def get_course_keywords_by_id(course):
    query = "SELECT keywords FROM course_scrape WHERE id = %d;" % int(course)
    results = execute_query(query)
    return results

#conn = get_connection(app)
