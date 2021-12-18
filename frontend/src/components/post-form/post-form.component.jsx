import { useState } from 'react';
import { Cascader, Input, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { LOCATION_OPTIONS, CATEGORY_OPTIONS } from './options';
import { formatPhoneNumber } from '../signin/signin.component';

import { connect } from 'react-redux';
import {
  setContactNum,
  setState,
  setCity,
  setCategory,
  setTitle,
  setDescription,
  setImages,
} from '../../redux/post-form/post-form.actions';

import { resizeFile } from './image-resizer';

import axios from 'axios';

import './post-form.styles.scss';

const { TextArea } = Input;

function PostForm({
  setContactNum,
  setState,
  setCity,
  setCategory,
  setTitle,
  setDescription,
  setImages,
  isMobile,
}) {
  const [phoneNumInput, setPhoneNumInput] = useState();
  const [imageUploadUrl, setImageUploadUrl] = useState();
  const [imageMap, setImageMap] = useState(new Map());

  const handlePhoneNumInput = (e) => {
    // this is where we'll call the phoneNumberFormatter function
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    // we'll set the input value using our setInputValue
    setPhoneNumInput(formattedPhoneNumber);
    setContactNum(formattedPhoneNumber);
  };

  const onSelectLocationChange = (value) => {
    setState(value[1]);
    if (value[2] !== '其他') {
      setCity(value[2]);
    }
  };

  const onSelectCategoryChange = (value) => {
    setCategory(value[1]);
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const getPresignedUrl = async () => {
    const response = await axios('http://127.0.0.1:8000/get_presigned_url');
    setImageUploadUrl(response.data);
  };

  const handleImageUpload = async ({
    file,
    onProgress,
    onSuccess,
    onError,
  }) => {
    try {
      const image = await resizeFile(file, 861, 861);
      try {
        const response = await axios({
          method: 'PUT',
          url: imageUploadUrl,
          headers: { 'Content-Type': 'multipart/form-data' },
          data: image,
          onUploadProgress: ({ total, loaded }) => {
            onProgress({ percent: (loaded / total) * 100 });
          },
        });
        const imageUrl = imageUploadUrl.split('?')[0];
        setImageMap((prev) => prev.set(file.uid, imageUrl));
        setImages([...imageMap.values()]);
        onSuccess(response);
      } catch (error) {
        // Upload to s3
        onError({ error });
      }
    } catch (error) {
      // Resize file
      onError({ error });
    }
  };

  const handleRemoveImage = (file) => {
    setImageMap((prev) => {
      prev.delete(file.uid);
      return prev;
    });
    setImages([...imageMap.values()]);
  };
  if (!isMobile) {
    return (
      <form className='post-form' onSubmit={(e) => e.preventDefault()}>
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
              onChange={onSelectCategoryChange}
              placeholder='请选择类型'
            />
          </div>
          <div className='title'>
            <Input
              size='large'
              placeholder='标题'
              onChange={onTitleChange}
              maxLength={50}
            />
          </div>
          <div className='description'>
            <TextArea
              size='large'
              placeholder='描述'
              showCount
              maxLength={200}
              rows={12}
              style={{ width: '100%' }}
              onChange={onDescriptionChange}
            />
          </div>
        </div>
        <div></div>
        <div className='form-right'>
          <Upload
            listType='picture'
            maxCount={5}
            accept='image/*'
            beforeUpload={getPresignedUrl}
            customRequest={handleImageUpload}
            onRemove={handleRemoveImage}
            disabled={imageMap.size >= 4 ? true : false}
            onPreview={() => {
              return null;
            }}
          >
            <Button icon={<UploadOutlined />} style={{ width: '100%' }}>
              上传照片 (可选)
            </Button>
          </Upload>
        </div>
      </form>
    );
  } else {
    return (
      <form className='m-post-form' onSubmit={(e) => e.preventDefault()}>
        <div className='m-form-text'>
          <div className='m-phone'>
            <Input
              size='large'
              placeholder='联系电话'
              prefix='🇺🇸 +1'
              onChange={handlePhoneNumInput}
              value={phoneNumInput}
            />
          </div>
          <Cascader
            size='large'
            options={LOCATION_OPTIONS}
            onChange={onSelectLocationChange}
            placeholder='请选择地区'
            className='m-selection'
          />
          <Cascader
            size='large'
            options={CATEGORY_OPTIONS}
            onChange={onSelectCategoryChange}
            placeholder='请选择类型'
            className='m-selection'
          />
          <div className='m-title'>
            <Input
              size='large'
              placeholder='标题'
              onChange={onTitleChange}
              maxLength={50}
            />
          </div>
          <div className='m-description'>
            <TextArea
              size='large'
              placeholder='描述'
              showCount
              maxLength={200}
              rows={10}
              style={{ width: '100%' }}
              onChange={onDescriptionChange}
            />
          </div>
        </div>
        <div></div>
        <div className='m-form-images'>
          <Upload
            listType='picture'
            maxCount={5}
            accept='image/*'
            beforeUpload={getPresignedUrl}
            customRequest={handleImageUpload}
            onRemove={handleRemoveImage}
            disabled={imageMap.size >= 4 ? true : false}
            style={{ width: '100%' }}
            onPreview={() => {
              return null;
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
}

const mapSateToProps = (state) => ({
  isMobile: state.isMobile.boolean,
});

const mapDispatchToProps = (dispatch) => ({
  setContactNum: (contactNum) => dispatch(setContactNum(contactNum)),

  setState: (state) => dispatch(setState(state)),

  setCity: (city) => dispatch(setCity(city)),

  setCategory: (category) => dispatch(setCategory(category)),

  setTitle: (title) => dispatch(setTitle(title)),

  setDescription: (description) => dispatch(setDescription(description)),

  setImages: (images) => dispatch(setImages(images)),
});

export default connect(mapSateToProps, mapDispatchToProps)(PostForm);
