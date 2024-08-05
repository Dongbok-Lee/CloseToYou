import pymysql.cursors
import os
from dotenv import load_dotenv

# 데이터베이스 연결 정보 설정


def execute_query(query):
    load_dotenv('../env/data.env')
    connection = pymysql.connect(
        host=os.getenv('dbhost'),  # 데이터베이스 호스트 이름 또는 IP 주소
        user=os.getenv('user'),   # 데이터베이스 사용자 이름
        password=os.getenv('password'), # 데이터베이스 사용자 비밀번호
        database=os.getenv('database'), # 연결할 데이터베이스 이름
        cursorclass=pymysql.cursors.DictCursor
    )
    result = ""
    try:
        with connection.cursor() as cursor:
            cursor.execute(query)
            connection.commit()

            result = cursor.fetchall()
            print(result)
    finally:
        # 연결 종료
        connection.close()
    return result

# print(execute_query("insert into clothes(nickname, type, pattern, color, location) values ('하양 티셔츠', '티셔츠', '없음', '하양', 'a9')"))
# print(execute_query("select * from clothes"))
