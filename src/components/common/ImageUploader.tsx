import React, { useState, useRef, useCallback, useEffect } from 'react';
import axios, { Axios } from 'axios';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { Toast } from './Toast';

interface ImageUploaderInterface {
	imageUrl: string;
	setImageUrl: React.Dispatch<React.SetStateAction<string>>;
}

const ImageUploader: React.FC<ImageUploaderInterface> = ({ imageUrl, setImageUrl }) => {
	const inputRef = useRef<HTMLInputElement | null>(null);

	const uploadImgBtn = useCallback(() => {
		inputRef.current?.click();
	}, []);

	const handleChangeFile = async (event: any) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append('image', event.target.files[0]);

		fetch(`${process.env.REACT_APP_FILE_API_URL}`, {
			method: 'POST',
			body: formData,
		})
			.then((res) => {
				return res.text();
			})
			.then((value) => {
				setImageUrl(value);
			});
	};

	return (
		<button className="m-auto w-32 h-32 rounded-full" onClick={uploadImgBtn} type="button">
			<input
				className="w-full h-full"
				type="file"
				name="image"
				accept="image/*"
				ref={inputRef}
				id="imgFile"
				onChange={handleChangeFile}
				style={{ display: 'none' }}
			/>
			<Avatar className="w-full h-full rounded-full" src={imageUrl || null} alt="프로필 이미지" />
		</button>
	);
};

export default ImageUploader;
