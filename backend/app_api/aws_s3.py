from decouple import config
import boto3
from botocore.exceptions import ClientError
import logging
import random
import string


s3_client = boto3.client('s3',
                         region_name='us-east-1',
                         aws_access_key_id=config('AWS_ACCESS_KEY_ID'),
                         aws_secret_access_key=config('AWS_SECRET_ACCESS_KEY'),
                         )

def create_presigned_url():
    object_name = ''.join(random.choices(string.ascii_uppercase + string.digits, k=32))
    try:
        response = s3_client.generate_presigned_url('get_object',
                                                    Params={'Bucket': 'us-188',
                                                            'Key': object_name},
                                                    ExpiresIn=60)
    except ClientError as e:
        logging.error(e)
        return None

    # The response contains the presigned URL
    return response


print(create_presigned_url())
