import { useState } from "react";
import { Cascader, Input, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { LOCATION_OPTIONS, CATEGORY_OPTIONS } from './options';
import { formatPhoneNumber } from '../signin/signin.component';

import axios from 'axios';

import './post-form.styles.scss';

const { TextArea } = Input;

function PostForm() {
  const [phoneNumInput, setPhoneNumInput] = useState();
  const [imageUploadUrl, setImageUploadUrl] = useState();
  const [imageMap, setImageMap] = useState(new Map());

  const onSelectLocationChange = (value) => {
    console.log(value);
  };

  const handlePhoneNumInput = (e) => {
    // this is where we'll call the phoneNumberFormatter function
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    // we'll set the input value using our setInputValue
    setPhoneNumInput(formattedPhoneNumber);
  };

  const getPresignedUrl = async () => {
    const response = await axios('http://localhost:8000/get_presigned_url');
    setImageUploadUrl(response.data);
  };

  const handleImageUpload = async ({
    file,
    onProgress,
    onSuccess,
    onError,
  }) => {
    try {
      const response = await axios({
        method: 'PUT',
        url: imageUploadUrl,
        headers: { 'Content-Type': 'multipart/form-data' },
        data: file,
        onUploadProgress: ({ total, loaded }) => {
          onProgress({ percent: (loaded / total) * 100 });
        },
      });
      const imageUrl = imageUploadUrl.split('?')[0];
      setImageMap((prev) => new Map([...prev, [file.uid, imageUrl]]));
      onSuccess(response);
    } catch (error) {
      onError({ error });
    }
  };

  const handleRemoveImage = (file) => {
    setImageMap((prev) => {
      const newImageMap = new Map(prev);
      newImageMap.delete(file.uid);
      return newImageMap;
    });
  };

  return (
    <form className='post-form'>
      <span />
      <div className='form-left'>
        <div className='phone'>
          <Input
            size='large'
            placeholder='联系电话'
            prefix='🇺🇸 +1'
            onChange={handlePhoneNumInput}
            value={phoneNumInput}
          />
        </div>
        <div className='selections'>
          <Cascader
            size='large'
            style={{ width: '50%' }}
            options={LOCATION_OPTIONS}
            onChange={onSelectLocationChange}
            placeholder='请选择地区'
          />
          <Cascader
            size='large'
            style={{ width: '50%' }}
            options={CATEGORY_OPTIONS}
            onChange={onSelectLocationChange}
            placeholder='请选择类型'
          />
        </div>
        <div className='title'>
          <Input size='large' placeholder='标题' />
        </div>
        <div className='description'>
          <TextArea
            size='large'
            placeholder='描述'
            showCount
            maxLength={200}
            rows={10}
            style={{ width: '100%' }}
          />
        </div>
      </div>
      <span />
      <div className='form-right'>
        <Upload
          listType='picture'
          maxCount={5}
          accept='image/*,.heic'
          beforeUpload={getPresignedUrl}
          customRequest={handleImageUpload}
          onRemove={handleRemoveImage}
          onPreview={() => {
            console.log(imageMap);
          }}
        >
          <Button icon={<UploadOutlined />} style={{ width: '100%' }}>
            上传照片 (可选)
          </Button>
        </Upload>
      </div>
    </form>
  );
}

export default PostForm;
