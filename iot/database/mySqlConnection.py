import mysql.connector
from mysql.connector import Error

import yaml
import os

def read_db_config(filename='config.yaml'):
    """ YAML 설정 파일에서 DB 접속 정보를 읽어오는 함수 """
    # 상대 경로를 절대 경로로 변환
    base_path = os.path.abspath(os.path.dirname(__file__))
    full_path = os.path.join(base_path, filename)

    with open(full_path, 'r') as file:
        config = yaml.safe_load(file)
    return config['database']

class MySQLDatabase:
    def __init__(self, config):
        self.host = config.get('host')
        self.database = config.get('database')
        self.user = config.get('user')
        self.password = config.get('password')
        self.connection = None

    def connect(self):
        """ 데이터베이스에 연결 """
        try:
            self.connection = mysql.connector.connect(
                host=self.host,
                database=self.database,
                user=self.user,
                password=self.password
            )
            if self.connection.is_connected():
                print("데이터베이스에 연결되었습니다.")
        except Error as e:
            print(f"에러가 발생했습니다: {e}")
            self.connection = None

    def disconnect(self):
        """ 데이터베이스 연결 해제 """
        if self.connection is not None and self.connection.is_connected():
            self.connection.close()
            print("데이터베이스 연결이 해제되었습니다.")

    def execute_query(self, query, params=None):
        """ 데이터베이스 쿼리 실행 """
        if self.connection is None or not self.connection.is_connected():
            print("데이터베이스에 연결되어 있지 않습니다.")
            return None

        cursor = self.connection.cursor()
        try:
            cursor.execute(query, params)
            self.connection.commit()
            print("쿼리가 성공적으로 실행되었습니다.")
        except Error as e:
            print(f"쿼리 실행 중 에러가 발생했습니다: {e}")
        finally:
            cursor.close()

    # 데이터 단일 조회
    def fetch_one_result(self, query, params=None):
        """ 데이터베이스에서 단일 결과를 가져오기 (한 행) """
        if self.connection is None or not self.connection.is_connected():
            print("데이터베이스에 연결되어 있지 않습니다.")
            return None

        cursor = self.connection.cursor(dictionary=True)
        try:
            cursor.execute(query, params)
            result = cursor.fetchone()
            return result
        except Error as e:
            print(f"결과를 가져오는 중 에러가 발생했습니다: {e}")
            return None
        finally:
            cursor.close()

    def fetch_results(self, query, params=None):
        """ 데이터베이스에서 결과를 가져오기 """
        if self.connection is None or not self.connection.is_connected():
            print("데이터베이스에 연결되어 있지 않습니다.")
            return None

        cursor = self.connection.cursor(dictionary=True)
        try:
            cursor.execute(query, params)
            results = cursor.fetchall()
            return results
        except Error as e:
            print(f"결과를 가져오는 중 에러가 발생했습니다: {e}")
            return None
        finally:
            cursor.close()

# 사용 예시
# if __name__ == "__main__":
#     config = read_db_config()
#     db = MySQLDatabase(config)
#     db.connect()
#
#     # 예제 쿼리 실행
#     create_table_query = """
#     CREATE TABLE IF NOT EXISTS clothes (
#         clothes_id INT AUTO_INCREMENT PRIMARY KEY,
#         nickname VARCHAR(255) NOT NULL,
#         color VARCHAR(255) NOT NULL,
#         wearing_count int DEFAULT 0,
#         location VARCHAR(255) NOT NULL
#     )
#     """
#     db.execute_query(create_table_query)
#
#     # 데이터 삽입
#     insert_query = "INSERT INTO clothes (nickname, color, location) VALUES (%s, %s, %s)"
#     db.execute_query(insert_query, ("빨간 체크무늬 셔츠", "빨간색", "A-3"))
#
#     # 데이터 수정
#     update_query = "UPDATE clothes SET nickname = %s, color = %s, location = %s WHERE clothes_id = %s"
#     db.execute_query(update_query, ("파란 체크무늬 셔츠", "파란색", "B-2", 1))
#
#     # 데이터 삭제
#     delete_query = "DELETE FROM clothes WHERE clothes_id = %s"
#     db.execute_query(delete_query, (2,))
#
#     # 데이터 단일 조회
#     select_query = "SELECT * FROM clothes WHERE clothes_id = %s"
#     result = db.fetch_one_result(select_query, (3,))
#     print(result)
#
#     # 데이터 전체 조회
#     select_query = "SELECT * FROM clothes"
#     results = db.fetch_results(select_query)
#     for row in results:
#         print(row)
#
#     db.disconnect()

# 필요한 라이브러리 설치 명령어
# pip install pyyaml
# pip install mysql-connector-python
