import { useState } from 'react';
import { Modal } from 'antd';
import Button from './Button';
import ImageUploader from './ImageUploader';
import SelectClass from './SelectClass';
// import { handleChange } from '../../pages/multi/Class/Class';
import { AUTHORITY } from '../../constants/AuthorityType';
import { useUpdateProfileModal } from '../../hooks/useUpdateProfile';

interface ProfileUpdaterInterface {
	isModalOpen?: boolean;
	isLoading: boolean;
	selectedName?: string;
	setSelectedName: React.Dispatch<React.SetStateAction<string>>;
	password?: string;
	setPassword?: React.Dispatch<React.SetStateAction<string>>;
	prevPassword?: string;
	setPrevPassword?: React.Dispatch<React.SetStateAction<string>>;
	handleOk: () => void;
	handleCancel: () => void;
	isDisabled: boolean;
	changePassword: boolean;
	handleChangeAuthority?: (value: string) => void;
	options?: { value: string | keyof typeof AUTHORITY; label: string }[];
}

const ProfileUpdater: React.FC<ProfileUpdaterInterface> = ({
	isModalOpen,
	changePassword,
	isDisabled,
	isLoading,
	selectedName,
	setSelectedName,
	password,
	setPassword,
	prevPassword,
	setPrevPassword,
	handleOk,
	handleCancel,
	handleChangeAuthority,
	options,
}) => {
	const [imageUrl, setImageUrl] = useState<string>('');
	return (
		<Modal
			title="정보 수정"
			open={isModalOpen}
			destroyOnClose
			onOk={handleOk}
			onCancel={handleCancel}
			maskClosable={false}
			footer={[
				<Button handleClick={handleCancel} content="취소" type="cancel" key="updateProfileCancel" />,
				<Button
					handleClick={handleOk}
					content="확인"
					loading={isLoading}
					disabled={isDisabled}
					type="positive"
					key="updateProfile"
				/>,
			]}
		>
			<div className="my-10 flex flex-col justify-center">
				<ImageUploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
				<div className="swal2-label">이름</div>
				<input
					id="swal2-input"
					value={selectedName}
					onChange={(e) => setSelectedName(e.target.value as string)}
					className="swal2-input mb-4"
					placeholder="수정할 이름을 입력해주세요."
				/>
				{changePassword && setPrevPassword && setPassword && (
					<>
						<div className="swal2-label">비밀번호</div>
						<input
							id="swal2-input"
							value={prevPassword}
							type="password"
							onChange={(e) => setPrevPassword(e.target.value)}
							className="swal2-input mb-4"
							placeholder="기존의 비밀번호를 입력해주세요."
						/>
						<input
							id="swal2-input"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="swal2-input mb-2"
							placeholder="새로운 비밀번호를 입력해주세요."
						/>
					</>
				)}
				{options && handleChangeAuthority && (
					<SelectClass options={options} handleChange={handleChangeAuthority} isFull isReadOnly />
				)}
			</div>
		</Modal>
	);
};

export default ProfileUpdater;
