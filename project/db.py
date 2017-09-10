from flask.ext.mysql import MySQL

def setup_db(app):
    mysql = MySQL()
    # MySQL configurations
    app.config['MYSQL_DATABASE_USER'] = 'scraper'
    app.config['MYSQL_DATABASE_PASSWORD'] = 'runescrape'
    app.config['MYSQL_DATABASE_DB'] = 'scrape'
    app.config['MYSQL_DATABASE_HOST'] = '104.236.9.215'
    mysql.init_app(app)

    conn = mysql.connect()
    return conn.cursor()

def query_db(cursor):
    sql_unis = "SELECT DISTINCT university FROM course_scrape"
    cursor.execute(sql_unis)
    result_unis = cursor.fetchall()

    sql_courses = "SELECT * FROM course_scrape LIMIT 2"
    cursor.execute(sql_courses)
    result_courses = cursor.fetchall()
    # sql = "SHOW COLUMNS FROM scrape.course_scrape"
    # cursor.execute(sql)
    return [result_unis, result_courses]