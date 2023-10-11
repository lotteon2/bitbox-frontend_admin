import { Modal } from 'antd';
import Button from './Button';
import ImageUploader from './ImageUploader';

interface ProfileUpdaterInterface {
	isModalOpen?: boolean;
	isLoading: boolean;
	name: string;
	setName: React.Dispatch<React.SetStateAction<string>>;
	password?: string;
	setPassword?: React.Dispatch<React.SetStateAction<string>>;
	prevPassword?: string;
	setPrevPassword?: React.Dispatch<React.SetStateAction<string>>;
	handleOk: () => void;
	handleCancel: () => void;
	isDisabled: boolean;
	changePassword: boolean;
}

const ProfileUpdater: React.FC<ProfileUpdaterInterface> = ({
	isModalOpen,
	changePassword,
	isDisabled,
	isLoading,
	name,
	setName,
	password,
	setPassword,
	prevPassword,
	setPrevPassword,
	handleOk,
	handleCancel,
}) => {
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
				<ImageUploader />
				<div className="swal2-label">이름</div>
				<input
					id="swal2-input"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="swal2-input"
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
							className="swal2-input mb-2"
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
			</div>
		</Modal>
	);
};

export default ProfileUpdater;
