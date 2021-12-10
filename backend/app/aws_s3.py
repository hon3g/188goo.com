from decouple import config
import boto3
from botocore.exceptions import ClientError
import logging
import random
import string
import datetime


s3_client = boto3.client('s3',
                         region_name='us-east-1',
                         aws_access_key_id=config('AWS_ACCESS_KEY_ID'),
                         aws_secret_access_key=config('AWS_SECRET_ACCESS_KEY'),
                         )


def create_presigned_url():
    object_name = get_random_unique_object_name()

    try:
        response = s3_client.generate_presigned_url('put_object',
                                                    Params={'Bucket': 'us-188',
                                                            'Key': object_name,
                                                            'ContentType': 'multipart/form-data'},
                                                    ExpiresIn=60)
    except ClientError as e:
        logging.error(e)
        return None

    # The response contains the presigned URL
    return response


def get_random_unique_object_name():
    random_string = ''.join(random.choices(
        string.ascii_uppercase + string.digits, k=16))
    numeric_filter = filter(str.isdigit, str(datetime.datetime.now()))
    datetime_string = "".join(numeric_filter)
    object_name = random_string + datetime_string
    return object_name
