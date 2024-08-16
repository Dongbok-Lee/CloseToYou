import boto3
from botocore.exceptions import NoCredentialsError
from dotenv import load_dotenv
import os

# .env 파일에서 환경 변수 로드
load_dotenv()

# AWS 자격 증명 설정
aws_access_key = os.getenv('AWS_ACCESS_KEY_ID')
aws_secret_key = os.getenv('AWS_SECRET_ACCESS_KEY')
aws_region = os.getenv('AWS_REGION')

def upload_to_s3(file_name, bucket, object_name=None):
    s3 = boto3.client(
        's3',
        aws_access_key_id=aws_access_key,
        aws_secret_access_key=aws_secret_key,
        region_name=aws_region
    )
    if object_name is None:
        object_name = file_name
    try:
        s3.upload_file(file_name, bucket, object_name)
        print(f"File {file_name} uploaded to {bucket}/{object_name}")
    except FileNotFoundError:
        print(f"The file {file_name} was not found")
    except NoCredentialsError:
        print("Credentials not available")

def download_from_s3(bucket, object_name, file_name=None):
    s3 = boto3.client(
        's3',
        aws_access_key_id=aws_access_key,
        aws_secret_access_key=aws_secret_key,
        region_name=aws_region
    )
    if file_name is None:
        file_name = object_name
    try:
        s3.download_file(bucket, object_name, file_name)
        print(f"File {file_name} downloaded from {bucket}/{object_name}")
    except FileNotFoundError:
        print(f"The file {file_name} was not found")
    except NoCredentialsError:
        print("Credentials not available")

# 예시 사용법
upload_to_s3('image.jpg', 'closetoyoubucket', 'image.jpg')
download_from_s3('closetoyoubucket', 'image.jpg', 'image2.jpg')
